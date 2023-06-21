import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL, {
  lazyConnect: true,
  offlineQueue: false,
  enableReadyCheck: true,
});

redis.on('ready', console.log);
