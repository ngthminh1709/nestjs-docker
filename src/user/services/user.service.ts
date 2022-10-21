import {Injectable, Logger} from "@nestjs/common";
import {RegisterUserDto} from "../dtos/user.dto";
import {BaseModel, InjectModel, InjectRepository, Repository} from '@iaminfinity/express-cassandra';
import {UserEntity} from "../entities/user.entity";
import {Observable, tap} from "rxjs";
import {UserRepository} from "../repositorries/user.repository";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository
    ) {
    }

    async register(registerUserDto: RegisterUserDto) {
        const {email, username, password} = registerUserDto;

        const newUser = this.userRepository.create(registerUserDto)
        return this.userRepository.save(newUser).pipe()

    }

}