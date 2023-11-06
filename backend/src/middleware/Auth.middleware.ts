import * as firebase from "firebase-admin";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { initializeApp } from "firebase/app";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: any;

  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGEING_SEND_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  constructor() {
    this.defaultApp = initializeApp(this.firebaseConfig);
  }

  use(req: any, res: any, next: (error?: any) => void): any {
    const token: any = req.headers.authorization;
    if (token.startsWith("Bearer ")) {
      const idToken = token.split("Bearer ")[0];
      firebase
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          req.user = decodedToken;
          next();
        })
        .catch(() => {
          res.status(401).json({ message: "Unauthorized" });
        });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
