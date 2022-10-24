import {Column, DataType, Entity} from '@iaminfinity/express-cassandra';

@Entity({
    table_name: 'rooms',
    key: ['id'],
    options: {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
})
export class RoomEntity {
    // @Column({
    //     type: 'uuid',
    //     default: { $db_function: 'uuid()' },
    // })
    // id: any;

    @Column({type: 'int'})
    id: number;

    @Column({type: 'uuid'})
    userId: any;
}
