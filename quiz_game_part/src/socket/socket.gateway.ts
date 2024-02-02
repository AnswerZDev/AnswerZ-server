import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connecté :', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client déconnecté :', client.id);
  }


  @SubscribeMessage('chat')
  handleChatMessage(@MessageBody() message: string) {
    console.log('Message reçu du client :', message);
    
    this.server.emit('message', `Nouveau message du serveur : ${message} + 'serv`);
  }
}