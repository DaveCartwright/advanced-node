import requireLogin from '../middlewares/requireLogin';
import { createNewBlog, getBlogById, getBlogsByAuthor } from '../controllers/blogs';

export default (app) => {
  app.get('/api/blogs/:id', requireLogin, getBlogById);

  app.get('/api/blogs', requireLogin, getBlogsByAuthor);

  app.post('/api/blogs', requireLogin, createNewBlog);
};
