import {Injectable, Logger} from "@nestjs/common";
import {RegisterUserDto} from "../dtos/user.dto";
import {BaseModel, InjectModel, InjectRepository, Repository, uuid} from '@iaminfinity/express-cassandra';
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
        return this.userRepository.findOne({email: 'email@email.com'}, {return_query: true, allow_filtering: true}).pipe();

        // try{
        //     const user = await this.userRepository.findOne({email: 'email@email.com'},{raw:true}).pipe()
        //     await console.log(user)
        //     return { user: user }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    async create() {
        return {message: 'Create Page!'}
    }

    async getAll() {
        return this.userRepository.find({}).pipe()
    }

    async createNew(registerUserDto: RegisterUserDto) {
        const {email, username, password} = registerUserDto;
        const newUser = new this.userModel(registerUserDto)
        newUser.save();

        return { success: true, message: 'Create successfully!'}
    }

    async update(id, body) {
        const {email, username, password} = body;
        this.userModel.update({id: uuid(id)}, {email, username, password})

        return { success: true, message: 'Update successfully!'}
    }

    async register(registerUserDto: RegisterUserDto) {
        const {email, username, password} = registerUserDto;
        const newUser = this.userRepository.create(registerUserDto)
        return this.userRepository.save(newUser).pipe()
    }

    async upload(body, files) {
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