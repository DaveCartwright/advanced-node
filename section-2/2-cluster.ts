import express from 'express';
import cluster from 'cluster';
import { blockingLoop, page } from './lib';
import { createHash } from './lib';

const app = express();
const port = 3000;

const createForks = (forks: number) =>
  Array(forks)
    .fill(null)
    .forEach((e) => cluster.fork());

const initWorker = () => {
  app.get('/', (req, res) => res.send(page));
  app.get('/blocking', async (req, res) => res.send(await blockingLoop(Date.now(), 50000000)));
  app.get('/hash', async (req, res) => res.send(await createHash(Date.now())));
  app.get('/immediate', async (req, res) =>
    res.send(`/immediate endpoint should respond immediately`)
  );

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

cluster.isWorker ? initWorker() : createForks(2);
