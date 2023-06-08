import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import { redis } from '../services/redis';

const Blog = mongoose.model('Blog');

export default (app) => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get(
    '/api/blogs',
    requireLogin,
    async (req, res, next) => {
      const {
        user: { id: userId },
      } = req;

      const blogs = await redis.get(userId);
      return !blogs.length ? next() : res.json(blogs);
    },
    async (req, res) => {
      const blogs = await Blog.find({ _user: req.user.id });

      res.send(blogs);
    }
  );

  app.post(
    '/api/blogs',
    requireLogin,
    async (req, res, next) => {
      return next();
    },
    async (req, res) => {
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
    }
  );
};
