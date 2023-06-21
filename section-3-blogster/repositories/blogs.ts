import { Prisma } from '@prisma/client';
import { prisma } from '../services/prisma';

export const selectBlogsByUserId = async (query: Prisma.BlogFindManyArgs) =>
  prisma.blog.findMany(query);

export const selectBlogByIdForUser = async (query: Prisma.BlogFindUniqueArgs) =>
  prisma.blog.findFirst(query);
