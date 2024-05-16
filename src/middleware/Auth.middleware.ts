import * as firebase from "firebase-admin";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { initializeApp } from "firebase/app";
import { FireBaseConfig } from "../config/firebase.config"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: firebase.app.App;

  private _firebaseConfig = new FireBaseConfig().getConfig()

  constructor() {
    if (!firebase.apps.length) {
      this.defaultApp = firebase.initializeApp(this._firebaseConfig);
    } else {
      this.defaultApp = firebase.app();
    }
  }

  use(req: any, res: any, next: (error?: any) => void): any {
    const token: string = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      const idToken = token.split('Bearer ')[1];
      this.defaultApp.auth().verifyIdToken(idToken)
          .then((decodedToken) => {
            req.user = decodedToken;
            next();
          })
          .catch((error) => {
            res.status(401).json({ message: 'Unauthorized', error: error.message });
          });
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  }
}
