import { Response } from 'express';
import { prisma } from '../services/prisma';
import { CacheKey, getCache, invalidateCacheByKey, setCache } from '../repositories/redis';
import { ContextualRequest } from '../interfaces/request';
import { selectBlogsByUserId, selectBlogById } from '../repositories/blogs';
import { Prisma } from '@prisma/client';

export const getBlogById = async (req: ContextualRequest, res: Response) => {
  try {
    const {
      params: { id, author },
      user: { id: userId },
    } = req;

    const query: Prisma.BlogFindUniqueArgs = { where: { id } };
    const field: CacheKey = { ...query, collection: 'blog' };

    const cache = await getCache(userId, field);
    if (cache) return res.json(cache);

    const blog = await selectBlogById(query);
    await setCache(userId, field, blog);

    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getBlogsByAuthor = async (req: ContextualRequest, res: Response) => {
  try {
    const {
      params: { author },
      user: { id: userId },
    } = req;

    const query: Prisma.BlogFindManyArgs = { where: { userId: userId } };
    const field: CacheKey = { ...query, collection: 'blog' };

    const cache = await getCache(userId, field);
    if (cache) return res.json(cache);

    const blogs = await selectBlogsByUserId(query);
    await setCache(userId, field, blogs);

    return res.send(blogs);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const createNewBlog = async (req: ContextualRequest, res: Response) => {
  try {
    const {
      body: { title, content },
      user: { id: userId },
    } = req;

    const blog = await prisma.blog.create({
      data: { title, content, userId },
    });

    invalidateCacheByKey(userId);

    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
};
