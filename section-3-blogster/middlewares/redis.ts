import { redis } from '../services/redis';

export const checkCache = async (req, res, next) => {
  const {
    user: { id: userId },
  } = req;

  const blogs = await redis.get(userId);
  return !blogs?.length ? next() : res.json(blogs);
};
