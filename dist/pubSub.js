import { Redis } from 'ioredis';
import { createRedisEventTarget } from '@graphql-yoga/redis-event-target';
import { createPubSub } from 'graphql-yoga';
import dotenv from 'dotenv';
dotenv.config();
const options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};
const publishClient = new Redis(options);
const subscribeClient = new Redis(options);
const eventTarget = createRedisEventTarget({
  publishClient,
  subscribeClient
});
const pubSub = createPubSub({
  eventTarget
});
export default pubSub;