import {Injectable, InternalServerErrorException} from "@nestjs/common";
import * as firebase from "firebase-admin";
import {FireBaseConfig} from "../../config/firebase.config";

@Injectable()
export class FirebaseService {

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
            const user: any = await this._defaultApp.auth().getUser(uid);
            console.log(user);
            return {
                email: user.email,
                displayName: user.displayName,
                photoName: user.photoName,
                phoneNumber: user.phoneNumber
            };
        } catch (error) {
            throw error; // Re-throw the error or handle it as needed
        }
    }

    public async updateUser(uid: string, data: any): Promise<any> {
        try {

            const userRef = this._defaultApp.firestore().collection('users').doc(uid);
            const doc = await userRef.get();
            if (!doc.exists || !doc.data().photoName) {
                // Si le champ photoName n'existe pas, le créer
                await this._addUserRef(uid, 'photoName', data.photoName);
            } else {
                // Si le champ photoName existe, le mettre à jour
                await this._defaultApp.auth().updateUser(uid, data);
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    private async _addUserRef(uid: string, fieldName: string, value: any): Promise<void> {
        try {
            await this._defaultApp.firestore().collection("users").doc(uid).set({
                [fieldName]: value
            }, {merge: true});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
