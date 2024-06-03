import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../rooms/room.service';
import { Game } from 'src/Models/Game';
import { RoomDebug } from 'debug/rooms.debug';
import { SocketService } from './socket.service';

@WebSocketGateway( { cors: true})
export class SocketGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  handleConnection(client: Socket) {
    console.log('Client connecté :', client.id);
      
      this.server.to(client.id).emit("connected");

      client.on('give-user-infos', (arg) => {
        const roomId = this.isClientAlreadyInRooms(arg.uid);

        if(roomId != null){
          this.roomService.joinRoom(roomId, client);
          this.server.to(client.id).emit("already-in-room", roomId);
        }
      });

      if(client)
        client.on('getRoomInfo', (roomId: string, userUid: string) => {
          const roomInfo = this.roomService.getRoomInfo(roomId);
          if (roomInfo) {
              client.emit('roomInfo', roomInfo);
          }
        });
        

      client.on('create-game', (arg1, arg2) => {
        const roomId = arg1;
        const game = new Game(arg2.uid);
        this.roomService.createRoom(roomId, client, game, arg2.uid);
        this.server.emit('roomCreated', roomId);
        RoomDebug.displayActualRoomStates(this.server);
      });

      

      client.on('join-game', (arg1, arg2) => {
        console.log(arg2);
        this.roomService.joinRoom(arg1, client, arg2.uid);
        this.server.emit('joined-game', arg1);
        this.server.to(arg1).emit('userJoined');
        RoomDebug.displayActualRoomStates(this.server);
      });

      



      client.on('leave-game', (roomIdArg, gameHostArg) => {
        const roomId = roomIdArg;

        /*
        if(isHost){
          this.server.to(roomId).emit("host-leave");
          this.server.socketsLeave(roomId);
        }
        else{
          client.leave(roomId);
          this.roomService.leaveRoom(roomId, client);
        }
        
        RoomDebug.displayActualRoomStates(this.server);
        */
      });


      client.on('start-game', (arg) => {
        const roomId = arg;
        this.server.to(roomId).emit('game-started');
      });
  }

  handleDisconnect(client: Socket) {
    // TODO
  }

  isClientAlreadyInRooms(userUid : string) : string{
    return this.roomService.isClientAlreadyInRoom(userUid);
  }
}

