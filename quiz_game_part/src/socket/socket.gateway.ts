import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../rooms/room.service';
import { Game } from 'src/Models/Game';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  handleConnection(client: Socket) {
    console.log('Client connecté :', client.id);

    this.server.to(client.id).emit("connected");

    client.on('give-user-infos', (arg) => {
      const roomId = this.isClientAlreadyInRooms(arg.uid);

      if (roomId != null) {
        this.roomService.joinRoom(roomId, client);
        this.server.to(client.id).emit("already-in-room", roomId);
      }
    });

    client.on('getRoomInfo', (roomId: string, userUid: string) => {
      const roomInfo = this.roomService.getRoomInfo(roomId);
      if (roomInfo) {
        client.emit('roomInfo', roomInfo);
      }
    });

    client.on('create-game', (roomId: string, user: { uid: string }) => {
      const game = new Game(user.uid);
      this.roomService.createRoom(roomId, client, game, user.uid);
      this.server.emit('roomCreated', roomId);
    });

    client.on('join-game', (roomId: string, user: { uid: string }) => {
      console.log(user);
      this.roomService.joinRoom(roomId, client, user.uid);
      this.server.emit('joined-game', roomId);
      this.server.to(roomId).emit('userJoined');
    });

    client.on('leave-game', (roomId: string, user: { uid: string }) => {
      const roomHost = this.roomService.rooms.get(roomId).game.host;

      if (user.uid === roomHost) {
        this.server.to(roomId).emit("host-leave");
        this.server.socketsLeave(roomId);
        this.roomService.leaveRoom(roomId, client);
      } else {
        client.leave(roomId);
        this.roomService.leaveRoom(roomId, client);
      }
    });

    client.on('start-game', async (roomId: string) => {
      this.roomService.setGameStateToPlay(roomId);
      this.server.to(roomId).emit('game-started');

      const nbrQuestions = this.roomService.getNumberOfQuestions(roomId);
      for (let i = 0; i <= nbrQuestions - 1; i++) {
        await this.askQuestion(roomId, i);
      }
    });

    client.on('ask-question', (arg) => {
      const roomId = arg;
      const question = this.roomService.playGame(roomId);
      this.server.to(roomId).emit('question', question);
    });
  }

  async askQuestion(roomId: string, questionNumber: number) {
    const question = this.roomService.getQuestion(roomId, questionNumber);
    //%this.server.to(roomId).emit('question', question);
    console.log(question)

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  handleDisconnect(client: Socket) {
    console.log("user disconnected");
  }

  isClientAlreadyInRooms(userUid: string): string {
    return this.roomService.isClientAlreadyInRoom(userUid);
  }
}
