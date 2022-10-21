import { EntityRepository, Repository } from '@iaminfinity/express-cassandra';
import { from } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';
import {UserEntity} from "../entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    saveMultiple(users: any[]) {
        return from(users).pipe(
            mergeMap((user) => this.save(user)),
            toArray(),
        );
    }

    createNewUser(entity?: any): UserEntity {
        return this.create(entity)
    }
}