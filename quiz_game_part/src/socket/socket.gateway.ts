import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../rooms/room.service';
import { Game } from 'src/Models/Game';



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
      });

      

      client.on('join-game', (arg1, arg2) => {
        console.log(arg2);
        this.roomService.joinRoom(arg1, client, arg2.uid);
        this.server.emit('joined-game', arg1);
        this.server.to(arg1).emit('userJoined');
      });

      
    

      client.on('leave-game', (roomIdArg, useruidArg) => {
        const roomId = roomIdArg;

        const roomHost =  this.roomService.rooms.get(roomId).game.host;

        if(useruidArg.uid == roomHost){
          this.server.to(roomId).emit("host-leave");
          this.server.socketsLeave(roomId);
          this.roomService.leaveRoom(roomId, client);
        }
        else{
          client.leave(roomId);
          this.roomService.leaveRoom(roomId, client);
        }
        
      });


      client.on('start-game', (arg) => {
        const roomId = arg;
        this.roomService.setGameStateToPlay(roomId);
        this.server.to(roomId).emit('game-started');
      });

      client.on('ask-question', (arg) => {
        const roomId = arg;
        const question = this.roomService.playGame(roomId);
        this.server.to(roomId).emit('question', question);
      });

  }

  handleDisconnect(client: Socket) {
    console.log("user disconnected");
  }

  isClientAlreadyInRooms(userUid : string) : string{
    return this.roomService.isClientAlreadyInRoom(userUid);
  }
}

