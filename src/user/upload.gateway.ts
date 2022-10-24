import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {BaseModel, InjectModel, uuid} from "@iaminfinity/express-cassandra";
import {UserEntity} from "./entities/user.entity";
import {RoomEntity} from "./entities/room.entity";


@WebSocketGateway()
export class UploadGateway {
    @WebSocketServer() server: Server;

    constructor(
        @InjectModel(RoomEntity)
        private readonly roomModel: BaseModel<RoomEntity>,
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>,
    ) {
    }

    @SubscribeMessage('notify')
    async handleChatMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket,) {

    }

    @SubscribeMessage('notify-join')
    handleJoinMessage(@MessageBody() id: any, @ConnectedSocket() client: Socket) {
        console.log(id)
        client.join(id)
    }
}