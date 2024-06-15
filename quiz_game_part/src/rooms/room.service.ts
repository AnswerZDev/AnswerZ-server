import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Game } from 'src/Models/Game';

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
            if(userUid){
              room.users.push(userUid);
            }
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
      if (index!== -1) {
        room.clients.splice(index, 1);
        room.users.splice(index, 1);
        room.game.nOfActualPlayers -= 1;
  
        if (room.clients.length === 0) {
          this.rooms.delete(roomId);
        }
      }
    }
  }

  setGameStateToPlay(roomId : string){
    const room = this.rooms.get(roomId);
    if (room && room.game) {
      room.game.isLaunch = true;
    } else {
      throw new Error(`Room or game not found for roomId: ${roomId}`);
    }
  }

  getNumberOfQuestions(roomId: string){
    return this.rooms.get(roomId).game.questions.length;
  }

  getQuestion(roomId : string, questionNumber : number){
    return this.rooms.get(roomId).game.questions[questionNumber];
  }


  playGame(roomId: string) {
    const room = this.rooms.get(roomId);
    if (room && room.game) {
      const actualQuestionIndex = room.game.actualQuestionIndex;
      return room.game.questions[actualQuestionIndex];
    } else {
      throw new Error(`Room or game not found for roomId: ${roomId}`);
    }
  }
}
