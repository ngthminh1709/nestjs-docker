import {Injectable} from '@nestjs/common';
import {Queue} from 'bull';
import {InjectQueue} from '@nestjs/bull';
import {BaseModel, InjectModel} from "@iaminfinity/express-cassandra";
import {UserEntity} from "./entities/user.entity";

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>,
        @InjectQueue('image-queue') private readonly imageQueue: Queue
    ) {
    }

    async sendMessage(msg: string) {
        await this.imageQueue.add('image-message-job', {
            data: msg
        })
    }

    async uploaded() {
        await this.imageQueue.add('uploaded-image-job', {
            file: 'text'
        }, {})
    }

    async upload(body, files) {
        //logic
        try {
            // const {email, password, username} = body;
            for (const file of files)  {
                const newUser = new this.userModel({
                    email: 'email@email.com',
                    password: 'password',
                    username: 'username',
                    avatar: Buffer.from(file.buffer)
                })
                await newUser.save()
            }
            await this.imageQueue.add('upload-image-job', {
                files: files
            }, {
                // delay: 10000
                jobId: 'upload-image'
            })
        } catch (e) {
            console.log(e);
        }
    }
}