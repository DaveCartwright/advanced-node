import { redis } from '../services/redis';

export type CacheKey = Record<string, unknown> & { collection: 'blog' | 'user' };

export const getCache = async (key: string, field: CacheKey) =>
  JSON.parse(await redis.hget(JSON.stringify(key), JSON.stringify(field)));

export const setCache = async (
  hkey: string,
  field: Record<string, unknown>,
  data: unknown,
  ttl: number = 60 * 60 * 24 * 7
) => redis.hset(JSON.stringify(hkey), JSON.stringify(field), JSON.stringify(data), 'EX', ttl);

export const invalidateCacheByKey = async (key: string) => redis.del(JSON.stringify(key));

// for any given lookup save the result under the owner user id
// so if user 2 wants to see all the public blogs by user 1 and they are not
// in the cache, then save them in cache under hkey: 1, field: query
// in this way when user 1 updates/deletes a blog the cache will be cleared for all users
// and without needing to travers the cache to find posts
// the query must remain hidden to avoid leaking a user id
