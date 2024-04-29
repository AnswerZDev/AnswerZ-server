export class FireBaseConfig implements IConfig{
    private  _firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGEING_SEND_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
    };

    getConfig(): Object {
        return this._firebaseConfig;
    }
}