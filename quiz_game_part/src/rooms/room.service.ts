import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class RoomService {

  async joinRoom(roomId: string, client: Socket): Promise<void> {
    console.log(client.id  + ' added to ' + roomId + ' room');
    client.join(roomId);
  }



  async leaveRoom(roomId: string, userId: string): Promise<void> {
    
  }



  getAvailableRooms(server : Server): Map<string, Set<string>> {
    const adapter = server.sockets.adapter;
    const rooms = adapter.rooms;  

    return rooms;
  }

}
