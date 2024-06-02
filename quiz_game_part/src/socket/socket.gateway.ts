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
        console.log(this.isClientAlreadyInRooms(arg.uid));
        if(this.isClientAlreadyInRooms(arg.uid)){
          this.server.to(client.id).emit("already-in-room"); // add rtommid ro redirect
        }
      });
    
      if(client)
        client.on('getRoomInfo', (roomId: string, userUid: string) => {
          const roomInfo = this.roomService.getRoomInfo(roomId);
          if (roomInfo) {
            if (this.roomService.isClientInRoom(roomId, client.id)) {
              client.emit('roomInfo', roomInfo);
            }
          }
        });
        

      client.on('create-game', (arg1, arg2) => {
        const roomId = arg1;
        const game = new Game(client.id);
        this.roomService.createRoom(roomId, client, game, arg2.uid);
        this.server.emit('roomCreated', roomId);
        RoomDebug.displayActualRoomStates(this.server);
      });

      

      client.on('join-game', (arg1, arg2) => {
        this.roomService.joinRoom(arg1, arg2.uid, client);
        this.server.emit('joined-game', arg1);
        this.server.to(arg1).emit('userJoined');
        RoomDebug.displayActualRoomStates(this.server);
      });

      



      client.on('leave-game', (roomIdArg, isHostArg) => {
        const roomId = roomIdArg;
        const isHost = isHostArg;
        
        if(isHost){
          this.server.to(roomId).emit("host-leave");
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
    // TODO
  }

  isClientAlreadyInRooms(userUid : string) : boolean{
    return this.roomService.isClientAlreadyInroom(userUid);
  }
}

