import mongoose from 'mongoose';
import { redis } from '../services/redis';

const Blog = mongoose.model('Blog');

export const selectBlogByUserId = async (req, res) => {
  const blog = await Blog.findOne({
    _user: req.user.id,
    _id: req.params.id,
  });

  res.send(blog);
};

export const selectBlogsByUserId = async (req, res) => {
  const blogs = await Blog.find({ _user: req.user.id });

  redis.set(req.user.id, JSON.stringify(blogs));
  res.send(blogs);
};

export const createNewBlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = new Blog({
    title,
    content,
    _user: req.user.id,
  });

  try {
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.send(400, err);
  }
};
