import { redis } from '../services/redis';

export const expireUserCacheOnCreate = async (key: string, ttl: number = 0) => {
  await redis.expire(key, ttl);
};

export const getCachedDataByKey = async (key: unknown, field: unknown = null) =>
  redis.get(JSON.stringify(key));

export const setCacheWithTTL = async (key, data, ttl = 60 * 60 * 24 * 7) =>
  redis.set(JSON.stringify(key), JSON.stringify(data), 'EX', ttl);
