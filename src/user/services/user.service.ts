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
        @InjectConnection()
        private readonly connection: Connection,
        @InjectModel(UserEntity)
        private readonly userModel: BaseModel<UserEntity>,
    ) {
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

}