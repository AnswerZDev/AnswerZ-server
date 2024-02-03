import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../rooms/room.service';
import { RoomDebug } from 'debug/rooms.debug';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connecté :', client.id);

    const roomId = 'testRoom';

    this.roomService.joinRoom(roomId, client);

    RoomDebug.displayActualRoomStates(this.server);
  }


  handleDisconnect(client: Socket) {
    console.log('Client déconnecté :', client.id);

    const roomId = 'default';
    this.roomService.leaveRoom(roomId, client.id);

    client.leave(roomId);
  }
}

