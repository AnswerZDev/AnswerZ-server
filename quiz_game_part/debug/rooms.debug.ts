import { Server } from 'socket.io';
import { RoomService } from '../src/rooms/room.service';

export class RoomDebug {

  static displayActualRoomStates(server: Server) {
    const availableRooms = RoomService.getAvailableRooms(server);
    console.log(availableRooms);
  }
}
