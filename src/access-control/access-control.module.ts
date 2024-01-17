import { Module } from "@nestjs/common";
import { AccessControlController } from "./access-control.controller";
import { AccessControlService } from "./access-control.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AccessControl} from "../entities/AccessControl.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccessControl])],
  controllers: [AccessControlController],
  providers: [AccessControlService],
})
export class AccessControlModule {}
