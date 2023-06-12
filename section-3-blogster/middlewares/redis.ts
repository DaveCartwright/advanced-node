import { Request, Response } from 'express';
import { redis } from '../services/redis';

export const checkCache = async (req, res, next) => {
  const {
    user: { id: userId },
  } = req;

  const JSONblogs = await redis.get(userId);
  const parsedBlogs = JSON.parse(JSONblogs);

  return !parsedBlogs?.length ? next() : res.json(parsedBlogs);
};
