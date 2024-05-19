import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Game } from 'src/Models/Game';

@Injectable()
export class RoomService {
  rooms: Map<string, { clients: string[]; game?: Game }> = new Map();

  constructor() {}

  createRoom(roomId: string, client: Socket, game?: Game): void {
    try {
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, { clients: [] });
      }
      
      const room = this.rooms.get(roomId);
      if (room) {
        room.clients.push(client.id);
        if (game) {
          room.game = game;
          room.game.nOfActualPlayers += 1;
        }
        client.join(roomId);
      } else {
        throw new Error(`Impossible de récupérer la salle après sa création. ID de salle : ${roomId}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la salle:', error);
    }
  }
  


  joinRoom(roomId: string, client: Socket): void {
    try {
      if (this.rooms.has(roomId)) {
        const room = this.rooms.get(roomId);
        if (room) {
          room.clients.push(client.id);
          room.game.nOfActualPlayers += 1;
          client.join(roomId);
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


  getRoomInfo(roomId: string): any {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId);
    } else {
      return null; // Retournez null si la room n'existe pas
    }
  }

  leaveRoom(roomId: string, clientId: string): void {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      const index = room.clients.indexOf(clientId);
      if (index !== -1) {
        room.clients.splice(index, 1);
        if (room.clients.length === 0) {
          this.rooms.delete(roomId);
        }
      }
    }
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
