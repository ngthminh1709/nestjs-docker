import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity({
    table_name: 'users',
    key: ['id'],
    options: {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        versions: {
            key: '__v1',
        },
    },
})
export class UserEntity {
    @Column({
        type: 'uuid',
        default: { $db_function: 'uuid()' },
    })
    id: any;

    @Column({type: 'text'})
    username: string;

    @Column({type: 'text'})
    email: string;

    @Column({type: 'text'})
    password: string;
}