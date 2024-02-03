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

  /*
  * Following functions are here to manage rooms informations so there are static and use in debug class to display infos
  */

  static getAvailableRooms(server: Server): Record<string, string[]> {
    const adapter = server.sockets.adapter;
    const rooms = adapter.rooms;
  
    const availableRooms: Record<string, string[]> = {};
  
    if (rooms) {
      rooms.forEach((users, roomName) => {
        if (roomName && roomName !== '') {
          const usersArray = Array.from(users);
          availableRooms[roomName] = usersArray as string[];
        }
      });
    }
  
    return availableRooms;
  }
}
