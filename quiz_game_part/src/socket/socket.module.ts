import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { RoomModule } from '../rooms/room.module';

@Module({
  imports: [RoomModule],
  providers: [SocketGateway],
})
export class SocketModule {}
