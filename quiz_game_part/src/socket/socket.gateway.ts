import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../rooms/room.service';
import { Game } from 'src/Models/Game';
import { RoomDebug } from 'debug/rooms.debug';

@WebSocketGateway( { cors: true})
export class SocketGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  handleConnection(client: Socket) {
    console.log('Client connecté :', client.id);

      client.on('answer', (data) => {
        console.log(`Message reçu de la room ${data.roomId}: ${data.message}`);
      });
    


      client.on('create-game', (arg) => {
        const roomId = arg;

        console.log('create-game');

        const game = new Game();

        this.roomService.joinRoom(roomId, client, game);

        console.log(this.roomService.rooms);

        //RoomDebug.displayActualRoomStates(this.server);
      });

  }

  handleDisconnect(client: Socket) {
    console.log('Client déconnecté :', client.id);

    const roomId = 'default';
    this.roomService.leaveRoom(roomId, client.id);

    client.leave(roomId);
  }  
}

