import requireLogin from '../middlewares/requireLogin';
import { createNewBlog, getBlogById, getBlogsByUserId } from '../controllers/blogs';

export default (app) => {
  app.get('/api/blogs/:id', requireLogin, getBlogById);

  app.get('/api/blogs', requireLogin, getBlogsByUserId);

  app.post('/api/blogs', requireLogin, createNewBlog);
};
