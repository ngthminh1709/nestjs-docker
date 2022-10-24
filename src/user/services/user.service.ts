import {Injectable, Logger} from "@nestjs/common";
import {RegisterUserDto} from "../dtos/user.dto";
import {
    BaseModel,
    Connection,
    InjectConnection,
    InjectModel,
    InjectRepository,
    Repository
} from '@iaminfinity/express-cassandra';
import {UserEntity} from "../entities/user.entity";
import {Observable, tap} from "rxjs";
import {UserRepository} from "../repositorries/user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository
    ) {
    }

    async index() {
        return this.userRepository.findOne({email: 'email@email.com'}, {raw: true, allow_filtering: true}).pipe();

        // try{
        //     const user = await this.userRepository.findOne({email: 'email@email.com'},{raw:true}).pipe()
        //     await console.log(user)
        //     return { user: user }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    async chatPage() {
        return { title: 'Chat Room' }
    }

    async register(registerUserDto: RegisterUserDto) {
        const {email, username, password} = registerUserDto;
        // const user = this.userModel.findOne({email}, {return_query: true, raw: true});

        // const query = 'SELECT * FROM "users" WHERE "email" = ? LIMIT 1 ALLOW FILTERING;'
        await this.userModel.execute_query(
            'SELECT * FROM "users";',
            [],
            (error, value) => {
                if (error) {
                    console.log(error);
                } else {
                   console.log(value)
                }
            })

        // const newUser = this.userModel.create(registerUserDto)
        const newUser = new this.userModel(registerUserDto)
        await newUser.save()

        return {
            success: true,
            message: 'Registered'
        }
    }

    async upload(body, files) {
        // await console.log(file)
        for (const file of files)  {
            const newUser = new this.userModel({
                email: 'email@email.com',
                password: 'password',
                username: 'username',
                avatar: Buffer.from(file.buffer)
            })
            await newUser.save()
        }

        return {
            success: true,
        }
    }
}