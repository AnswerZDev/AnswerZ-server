import { Server } from 'socket.io';
import { RoomService } from '../src/rooms/room.service';

export class RoomDebug {

  static displayActualRoomStates(server: Server) {
    const roomService = new RoomService();

    const availableRooms = RoomService.getAvailableRooms(server);
    console.log(availableRooms);
  }
}
