import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SocketModule} from './socket/socket.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        SocketModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as unknown as any,
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            retryAttempts: parseInt(process.env.DATABASE_RETRY_ATTEMPTS),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
