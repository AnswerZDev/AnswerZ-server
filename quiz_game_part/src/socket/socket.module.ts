import {Module} from '@nestjs/common';
import {SocketGateway} from './socket.gateway';
import {RoomModule} from '../rooms/room.module';
import {HttpModule} from '@nestjs/axios';
import {SocketService} from './socket.service';
import {SocketController} from './socket.controller';

@Module({
    imports: [
        RoomModule,
        HttpModule,
    ],
    providers: [SocketGateway, SocketService],
    controllers: [SocketController]
})
export class SocketModule {
}
