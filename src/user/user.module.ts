import {Module} from '@nestjs/common';
import {UserController} from "./controllers/user.controller";
import {ExpressCassandraModule} from '@iaminfinity/express-cassandra';
import {UserService} from "./services/user.service";
import {UserEntity} from "./entities/user.entity";
import {ImageService} from "./upload.producer.service";
import {ImageConsumer} from "./upload.consumer";
import {BullModule} from "@nestjs/bull";
import {ChatGateway} from "./chat.gateway";
import {RoomEntity} from "./entities/room.entity";
import {UploadGateway} from "./upload.gateway";

@Module({
    imports: [
        ExpressCassandraModule.forFeature([UserEntity, RoomEntity]),
        // BullModule.forRoot(({
        //     redis:{
        //         host: 'localhost',
        //         port: 6379,
        //     }
        // })),
        BullModule.registerQueue({
            name: 'image-queue',
        }),
    ],
    controllers: [UserController],
    providers: [UserService, ImageService, ImageConsumer, ChatGateway, UploadGateway],
})
export class UserModule {
}
