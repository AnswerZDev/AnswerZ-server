import {Injectable, InternalServerErrorException} from "@nestjs/common";
import * as firebase from "firebase-admin";
import {FireBaseConfig} from "../../config/firebase.config";

@Injectable()
export class FirebaseService{

    private readonly _defaultApp: firebase.app.App;

    private _firebaseConfig = new FireBaseConfig().getConfig();

    constructor() {
        if (!this._defaultApp) {
            this._defaultApp = firebase.initializeApp(this._firebaseConfig);
        } else {
            this._defaultApp = firebase.app();
        }
    }

    public async verifyToken(token: string): Promise<firebase.auth.DecodedIdToken> {
        return this._defaultApp.auth().verifyIdToken(token)
    }

    public async getUser(uid: string): Promise<any> {
        try {
            const user = await this._defaultApp.auth().getUser(uid);
            return {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber
            };
        } catch (error) {
            throw error; // Re-throw the error or handle it as needed
        }
    }

    public async updateUser(uid: string, data: any): Promise<any> {
        try {
            await this._defaultApp.auth().updateUser(uid, data);
        } catch (error) {
            throw new InternalServerErrorException("Error while updating user");
        }
    }
}
