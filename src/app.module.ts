import { Module, CacheModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {redisStore} from 'cache-manager-redis-store'
import {UserModule} from "./user/user.module";
import {auth, ExpressCassandraModule, ExpressCassandraModuleOptions} from "@iaminfinity/express-cassandra";
import {BullModule} from "@nestjs/bull";
import {ImageService} from "./user/upload.producer.service";
import {ImageConsumer} from "./user/upload.consumer";

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
        UserModule,
        ExpressCassandraModule.forRoot(cassandraOptions),

        ConfigModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
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
