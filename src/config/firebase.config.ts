import * as process from "process";
import {credential} from "firebase-admin";
import Credential = credential.Credential;

export class FireBaseConfig implements IConfig{

    private _admin = require('firebase-admin');

    private _serviceAccount = require("../../googleAuth.json");

    private  _firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGEING_SEND_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
        credential: this._admin.credential.cert(this._serviceAccount) as unknown as Credential
    };

    getConfig(): Object {
        return this._firebaseConfig;
    }
}