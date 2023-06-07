import express from 'express';
import { Worker } from 'worker_threads';
import { page } from './lib';
import path from 'path';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(page));

app.get('/blocking', async (req, res) => {
  const worker = new Worker(path.join(__dirname, '4-worker.js'));
  const variable = 1;
  worker.on('message', (message) => {
    // variable from enclosing scope not available here
    res.send(message);
  });

  worker.postMessage('start!');
});

app.get('/immediate', async (req, res) => res.send(`endpoint should respond immediately`));

app.listen(port, () =>
  console.log(`Example app listening on port ${port}! goto http://localhost:${port}/ to test`)
);
