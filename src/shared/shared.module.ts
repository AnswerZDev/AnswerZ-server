import {Module} from "@nestjs/common";
import {FirebaseService} from "./services/firebase.service";
import {FileUploadService} from "./services/file-upload.service";


@Module({
    providers: [
        FirebaseService,
        FileUploadService
    ],
    exports: [
        FirebaseService,
        FileUploadService
    ],
})
export class SharedModule {
}
