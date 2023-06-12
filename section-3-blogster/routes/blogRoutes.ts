import requireLogin from '../middlewares/requireLogin';
import { createNewBlog, selectBlogByUserId, selectBlogsByUserId } from '../controllers/blogs';
import { checkCache } from '../middlewares/redis';

export default (app) => {
  app.get('/api/blogs/:id', requireLogin, selectBlogByUserId);

  app.get('/api/blogs', requireLogin, checkCache, selectBlogsByUserId);

  app.post('/api/blogs', requireLogin, createNewBlog);
};
