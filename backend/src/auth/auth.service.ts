import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignupUserDto } from "../dto/signup-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getIdToken } from "@firebase/auth";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

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
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
