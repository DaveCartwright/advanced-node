import express from 'express';
import { blockingLoop, page } from './lib';
import { promisify } from 'util';
import { pbkdf2 } from 'crypto';

const app = express();
//
const port = 3000;

app.get('/', (req, res) => res.send(page));

app.get('/blocking', async (req, res) => res.send(await blockingLoop(Date.now(), 50000000)));
app.get('/hash', async (req, res) => res.send(await createHash(Date.now(), 1200000)));
app.get('/immediate', async (req, res) => res.send(`endpoint should respond immediately`));

app.listen(port, () =>
  console.log(`Example app listening on port ${port}! goto http://localhost:${port}/ to test`),
);
const pbkdf2Promise = promisify(pbkdf2);

const createHash = async (start: number, work: number) => {
  console.log('Creating Hash', start);
  const hash = await pbkdf2Promise('a', 'b', work, 512, 'sha512');
  const message = `Hash Created', ${Date.now() - start}`;
  console.log(message);
  return message;
};
