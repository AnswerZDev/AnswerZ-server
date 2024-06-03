import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Game } from 'src/Models/Game';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class RoomService {
  rooms: Map<string, { clients: string[]; game?: Game; users: string[]}> = new Map();


  createRoom(roomId: string, client: Socket, game: Game, userUid: string): void {
    try {
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, { clients: [], users: [] });
      }
      
      const room = this.rooms.get(roomId);
      if (room) {
        room.clients.push(client.id);
        room.users.push(userUid);
        if (game) {
          room.game = game;
          room.game.nOfActualPlayers += 1;
        }
        client.join(roomId);
        console.log(this.rooms);
      } else {
        throw new Error(`Impossible de récupérer la salle après sa création. ID de salle : ${roomId}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la salle:', error);
    }
  }
  


  joinRoom(roomId: string, client: Socket,  userUid: string = null): void {
    try {
      if (this.rooms.has(roomId)) {
        const room = this.rooms.get(roomId);
        if (room) {          
          if(client.id){
            room.clients.push(client.id);
          }
          room.game.nOfActualPlayers += 1;
          client.join(roomId);
          console.log(this.rooms);

        } else {
          throw new Error('La salle existe mais n\'a pas pu être récupérée.');
        }
      } else {
        throw new Error(`La salle avec l'ID ${roomId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client à la salle:', error);
    }
    
  }

  isClientInRoom(roomId, clientId) {
    const room = this.rooms.get(roomId);
    if (room && room.clients.includes(clientId)) {
        return true;
    }
    return false;
  }


  isClientAlreadyInRoom(clientId) {
    for (const [roomId, room] of this.rooms.entries()) {
        if (Array.isArray(room.users) && room.users.includes(clientId)) {
            return roomId;
        }
    }
    return null;
}





  getRoomInfo(roomId: string): any {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId);
    } else {
      return null;
    }
  }

  leaveRoom(roomId: string, client: Socket): void {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      const index = room.clients.indexOf(client.id);
      if (index !== -1) {
        room.clients.splice(index, 1);
        room.game.nOfActualPlayers -= 1;
        if (room.clients.length === 0) {
          this.rooms.delete(roomId);
        }
      }
    }
    console.log(this.rooms);
  }

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
