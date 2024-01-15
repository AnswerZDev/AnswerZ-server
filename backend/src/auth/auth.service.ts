import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignupUserDto } from "../dto/signup-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getIdToken } from "@firebase/auth";
import { ForgotPasswordUserDto } from "../dto/forgot-password-user.dto";
import { InvalidEmailException } from "../exception/invalid-email.exception";

@Injectable()
export class AuthService {
  constructor() {}

  private _firebaseConfig = {
    apiKey: process.env.API_KEY,
  };
  async signup(signUpDto: SignupUserDto) {
    const { email, password } = signUpDto;
    const app = initializeApp(this._firebaseConfig);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      // TODO() => modifier pour personalisé l'ajout du firebase ID en BASE + info de signupDto
    } catch (error) {
      throw new InternalServerErrorException("Error while creating user");
    }
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
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
      return { token };
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          throw new InvalidEmailException("Invalid Email");
          break;
        case "auth/user-disabled":
          throw new InternalServerErrorException("User disabled");
          break;
        case "auth/user-not-found":
          throw new NotFoundException("User not found");
          break;
        case "auth/wrong-password":
          throw new UnauthorizedException("Invalid credentials");
          break;
        default:
          throw new InternalServerErrorException("Error while login user");
          break;
      }
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordUserDto) {
    const { email } = forgotPasswordDto;
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
