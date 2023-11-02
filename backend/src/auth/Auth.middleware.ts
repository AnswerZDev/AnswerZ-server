import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';

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
    this.defaultApp = firebase.initializeApp(this.firebaseConfig);
  }

  use(req: any, res: any, next: (error?: any) => void): any {
    next();
  }
}
