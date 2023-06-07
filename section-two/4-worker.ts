import { parentPort } from 'worker_threads';
import { blockingLoop } from './lib';

parentPort?.on('message', () => parentPort?.postMessage(blockingLoop()));
