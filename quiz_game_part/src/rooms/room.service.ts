import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Game } from 'src/Models/Game';

@Injectable()
export class RoomService {
  rooms: Map<string, { clients: Set<string>; game?: Game }> = new Map();

  constructor() {}

  joinRoom(roomId: string, client: Socket, game?: Game): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, { clients: new Set() });
    }
    this.rooms.get(roomId).clients.add(client.id);
    if (game) {
      this.rooms.get(roomId).game = game;
    }
    client.join(roomId);
  }



  leaveRoom(roomId: string, clientId: string): void {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId).clients.delete(clientId);
      if (this.rooms.get(roomId).clients.size === 0) {
        this.rooms.delete(roomId);
      }
    }
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
