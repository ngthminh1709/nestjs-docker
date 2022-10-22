import {Module} from '@nestjs/common';
import {UserController} from "./controllers/user.controller";
import {ExpressCassandraModule} from '@iaminfinity/express-cassandra';
import {UserService} from "./services/user.service";
import {UserEntity} from "./entities/user.entity";
import {ImageService} from "./upload.producer.service";
import {ImageConsumer} from "./upload.consumer";
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [
        ExpressCassandraModule.forFeature([UserEntity]),
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
    providers: [UserService, ImageService, ImageConsumer],
})
export class UserModule {
}
