import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {

    constructor(private readonly _socketService: SocketService){}
    
    @Get('user-infos')
    async getUserInfos(@Req() req){
        const datas = await  this._socketService.getUserInfos(req.headers.authorization.split(' ')[1]);
        return datas;
    }
}


