import {Module} from '@nestjs/common';
import {UserController} from "./controllers/user.controller";
import {ExpressCassandraModule} from '@iaminfinity/express-cassandra';
import {UserService} from "./services/user.service";
import {UserEntity} from "./entities/user.entity";

@Module({
    imports: [ExpressCassandraModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
