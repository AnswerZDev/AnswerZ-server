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
          client.emit('roomInfo', roomInfo);
        } else {
          // Gérer le cas où la room n'existe pas ou les informations ne sont pas disponibles
          // Par exemple, envoyer un message d'erreur au client
          client.emit('roomInfoError', 'La room demandée n\'existe pas ou les informations sont indisponibles.');
        }
      });
      
    
      

      client.on('create-game', (arg) => {
        const roomId = arg;
        const game = new Game(client.id);
        this.roomService.joinRoom(roomId, client, game);
        console.log("New room " + roomId + " added");
        console.log(this.roomService.rooms);
        this.server.emit('roomCreated', roomId); // Émettre l'événement roomCreated
      });

  }

  handleDisconnect(client: Socket) {
    console.log('Client déconnecté :', client.id);

    const roomId = 'default';
    this.roomService.leaveRoom(roomId, client.id);

    client.leave(roomId);
  }  
}

