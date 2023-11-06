import { Injectable } from "@nestjs/common";
import { SignupUserDto } from "../dto/signup-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getIdToken } from "@firebase/auth";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private _firebaseConfig = {
    apiKey: process.env.API_KEY,
  };
  signup(signUpDto: SignupUserDto) {
    return signUpDto;
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const app = initializeApp(this._firebaseConfig);
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
  }
}
