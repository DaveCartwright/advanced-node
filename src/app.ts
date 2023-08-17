import express, { Request, Response } from 'express';
import { prisma } from './services/prisma';

export const app = () => {
  const app = express();

  app.use(express.json());

  app.post('/user', post);
  app.put('/user/:id/email', put);

  return app;
};

const put = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { email },
  } = req;

  const { email: updatedEmail } = await prisma.user.update({
    where: {
      id: parseInt(id, 10),
    },
    data: { email },
  });

  return res.json(updatedEmail);
};

const post = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return res.json({
    name: newUser.name,
    email: newUser.email,
  });
};
