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

      client.on('getRoomInfo', (roomId: string) => {
        const roomInfo = this.roomService.getRoomInfo(roomId);
        if (roomInfo) {
          if(this.roomService.isClientInRoom(roomId, client.id)){
            client.emit('roomInfo', roomInfo); // TODO USE client id not roomId
          }
        } else {
          client.emit('roomInfoError', 'La room demandée n\'existe pas ou les informations sont indisponibles.');
        }
      });

      client.on('create-game', (arg) => {
        const roomId = arg;
        const game = new Game(client.id);
        this.roomService.createRoom(roomId, client, game);
        this.server.emit('roomCreated', roomId);
        RoomDebug.displayActualRoomStates(this.server);
      });


      client.on('join-game', (arg) => {
        const roomId = arg;
        this.roomService.joinRoom(roomId, client);
        this.server.emit('joined-game', roomId);
        this.server.to(roomId).emit('userJoined');
        RoomDebug.displayActualRoomStates(this.server);
      });


      client.on('leave-game', (roomIdArg, isHostArg) => {
        const roomId = roomIdArg;
        const isHost = isHostArg;
        
        if(isHost){
          this.server.socketsLeave(roomId);
        }
        else{
          client.leave(roomId);
          this.roomService.leaveRoom(roomId, client);
        }
        
        RoomDebug.displayActualRoomStates(this.server);
      });


      client.on('start-game', (arg) => {
        const roomId = arg;
        this.server.to(roomId).emit('game-started');
      });
  }

  handleDisconnect(client: Socket) {
    console.log('Client déconnecté :', client.id);

    const roomId = 'default';
    this.roomService.leaveRoom(roomId, client);

    client.leave(roomId);
    RoomDebug.displayActualRoomStates(this.server);
  }  
}

