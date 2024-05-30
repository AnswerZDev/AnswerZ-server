export class User {
    private uid: string;
    private username: string;

    constructor(uid: string, username: string) {
        this.uid = uid;
        this.username = username;
    }

    public getUid() {
        return this.uid;
    }

    public setUid(uid: string) {
        return this.uid = uid;
    }

    public getusername() {
        return this.username;
    }

    public setUsername(username: string) {
        return this.username = username;
    }
}