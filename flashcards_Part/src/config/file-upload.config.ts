import * as process from "process";

export class FileUploadConfig implements IConfig{

    private  _fileUploadConfig: Object = {
        destination: process.env.DESTINATION_FILE_UPLOAD,
    };

    getConfig(): Object {
        return this._fileUploadConfig;
    }
}