import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {BaseModel, InjectModel, uuid} from "@iaminfinity/express-cassandra";
import {UserEntity} from "./entities/user.entity";
import {RoomEntity} from "./entities/room.entity";


@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(
        @InjectModel(RoomEntity)
        private readonly roomModel: BaseModel<RoomEntity>,
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>,
    ) {
    }

    @SubscribeMessage('chat-message')
    async handleChatMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket,) {
        const {id, receiver, message} = data;
        await this.roomModel.findOne({userId: uuid(id)}, {allow_filtering: true, raw: true}, async (error, room) => {
            if (error) console.log(error);
            this.server.to(room.id).emit('chat-message', message)
        });
        if (receiver) {
            await this.roomModel.find({userId: uuid(receiver)}, {allow_filtering: true, raw: true}, async (error, rooms) => {
                if (error) console.log(error);
                const sendRooms = await rooms.map(item => item.id);
                this.server.to(sendRooms).emit('chat-message', message)
            });
        }
        console.log(data)
    }

    @SubscribeMessage('chat-message-join')
    async handleChatMessage2(@MessageBody() id: any, @ConnectedSocket() client: Socket) {
        if (typeof id === 'string') {
            id = uuid(id);
        }
        await this.roomModel.findOne({userId: id}, {allow_filtering: true, raw: true}, (error, room) => {
            if (error) console.log(error);
            client.join(room.id)
        });
    }
}