import { Response } from 'express';
import { prisma } from '../services/prisma';
import {
  expireUserCacheOnCreate,
  getCachedDataByKey,
  setCacheWithTTL,
} from '../repositories/redis';
import { ContextualRequest } from '../interfaces/request';
import { selectBlogsByUserId, selectBlogByIdForUser } from '../repositories/blogs';

export const getBlogById = async (req: ContextualRequest, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const query = { where: { id } };

    const cachedBlog = await getCachedDataByKey(query);
    if (cachedBlog) {
      return res.send(JSON.parse(cachedBlog));
    }

    const blog = await selectBlogByIdForUser(query);
    await setCacheWithTTL(query, blog);

    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getBlogsByUserId = async (req: ContextualRequest, res: Response) => {
  try {
    const {
      user: { id: userId },
    } = req;

    const query = { where: { userId } };

    const cachedBlog = await getCachedDataByKey(query);
    if (cachedBlog) {
      return res.send(JSON.parse(cachedBlog));
    }

    const blogs = await selectBlogsByUserId(query);
    await setCacheWithTTL(query, blogs);

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

    expireUserCacheOnCreate(userId);

    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
};
