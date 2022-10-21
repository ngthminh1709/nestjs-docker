import { CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {redisStore} from 'cache-manager-redis-store'
import {UserModule} from "./user/user.module";
import {auth, ExpressCassandraModule, ExpressCassandraModuleOptions} from "@iaminfinity/express-cassandra";
import {UserEntity} from "./user/entities/user.entity";

const cassandraOptions: ExpressCassandraModuleOptions = {
    clientOptions: {
        contactPoints: ['localhost'],
        keyspace: 'test',
        protocolOptions: {
            port: 9042,
        },
        queryOptions: {
            consistency: 1,
        },
        authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra'),
    },
    ormOptions: {
        createKeyspace: true,
        defaultReplicationStrategy: {
            class: 'SimpleStrategy',
            replication_factor: 1,
        },
    },
};

@Module({
    imports: [
        ExpressCassandraModule.forRoot(cassandraOptions),
        // ExpressCassandraModule.forFeature([UserEntity]),
        UserModule,
        ConfigModule.forRoot(),
        CacheModule.registerAsync({
            // @ts-ignore
            useFactory: async () => {
                return {
                    store: await redisStore({}),
                };
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
