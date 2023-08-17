import { app as initApp } from './app';

export const startServer = () => {
  const app = initApp();
  const port = process.env.PORT;

  const server = app.listen(port, () => console.log(`Server started on port ${port}`));
};
