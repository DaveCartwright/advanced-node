import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import './dotenv';
import './models/User';
import './models/Blog';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import './services/passport';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
blogRoutes(app);

if (['ci', 'production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
