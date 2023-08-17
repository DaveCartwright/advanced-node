import request from 'supertest';

import { prisma } from '../src/services/prisma';
import { app as initApp } from '../src/app';

describe('DB Integration Tests', () => {
  const app = initApp();

  beforeEach(async () => {
    jest.resetAllMocks();

    await prisma.user.deleteMany({});
  });

  test('Should create a new user ', async () => {
    const user = { name: 'testName', email: 'testEmail' };

    const { body } = await request(app).post('/user').send(user);

    expect(body).toEqual(user);
  });

  test('Should update user email address', async () => {
    const email = 'updatedEmail';

    const { id } = await prisma.user.create({
      data: { name: 'testName', email: 'test@email' },
    });

    const { body } = await request(app).put(`/user/${id}/email`).send({ email });

    expect(body).toBe(email);
  });
});
