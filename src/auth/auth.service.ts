import {
    forwardRef, Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {SignupUserDto} from "./dto/signup-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getIdToken, updateProfile} from "@firebase/auth";
import {ForgotPasswordUserDto} from "./dto/forgot-password-user.dto";
import {InvalidEmailException} from "../exception/invalid-email.exception";
import {UsersService} from "../users/users.service";
import firebase from "firebase/compat";
import {User} from "../entities/User.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    private _firebaseConfig = {
        apiKey: process.env.API_KEY,
    };

    async signup(signUpDto: SignupUserDto) {
        const {email, password, firstName, lastName} = signUpDto;
        const app = initializeApp(this._firebaseConfig);
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential.user && userCredential.user.uid) {
                // add firstName and lastName fields to the firebase user
                await updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`,
                });

                // add user to the answerz database
                let newUser: User = new User();
                newUser.setId(userCredential.user.uid);
                await this.usersService.createUser(newUser);

            }
            const token = await getIdToken(userCredential.user);
            return {token};
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-email":
                    throw new InvalidEmailException("Le format de l'email est invalide");
                    break;
                case "auth/email-already-in-use":
                    throw new InvalidEmailException("Adresse email déjà utilisée");
                    break;
                case "auth/operation-not-allowed":
                    throw new InternalServerErrorException("Opération non autorisée");
                    break;
                case "auth/weak-password":
                    throw new InternalServerErrorException("Mot de passe trop faible");
                    break;
                default:
                    throw new InternalServerErrorException(error);
                    break;
            }
        }
    }

    async login(loginDto: LoginUserDto) {
        const {email, password} = loginDto;
        const app = initializeApp(this._firebaseConfig);
        try {
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            // Signed in
            const user = userCredential.user;
            // Génére un token JWT pour l'utilisateur et le retourne au format JSON
            const token = await getIdToken(user);
            return {token};
        } catch (error: any) {
            throw new UnauthorizedException("Identifiants ou mot de passe incorrect");
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordUserDto) {
        const {email} = forgotPasswordDto;
        const app = initializeApp(this._firebaseConfig);
        try {
            const auth = getAuth(app);
            await sendPasswordResetEmail(auth, email);
            // TODO() => modifier pour personalisé la modif des info de l'utilisateur en base
        } catch (error) {
            throw new InternalServerErrorException("Error while reset user password");
        }
    }
}
