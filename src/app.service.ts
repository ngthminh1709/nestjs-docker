import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from "cache-manager";
import { BodyDto } from './dtos/bodyDto';
import {RedisCache} from "./interfaces/redis.interface";
import {RedisClientType} from "redis";


@Injectable()
export class AppService {
  private redisClient: RedisClientType;
  constructor(
      @Inject(CACHE_MANAGER) private cacheManager: RedisCache
  ) {
    this.redisClient = this.cacheManager.store.getClient();
  }

  async getHello() {
    // await this.cacheManager.set("redis:test", "value test redis")
    // const value = await this.cacheManager.get("redis:test")
    return { message: 'Hello world' };
  }

  async saveToRedis(body: BodyDto) {
    const { key, value } = body;
    const result = await this.cacheManager.set(key, value);
    console.log(result);

    return { success: true, message: 'Saved to redis!' };
  }

  async getRedisValue(body: any) {
    const { key } = body;
    const result = await this.cacheManager.get(key);
    let res :any = 'Key is not existed!'
    if (result) {
      res = result
    }
    return { success: true, value: res };
  }
}
