/**
 * This file brings together all three parts of node to illustrate some interesting behaviour
 * It will require node to delegate to the OS, threadpool
 */

import https from 'https';
import crypto from 'crypto';
import fs from 'fs';
import { createHash } from '../section-2-enhancing-node-performance/lib';

const start = Date.now();

export const doRequest = (url: string) =>
  https
    .request(url, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('REQUEST', Date.now() - start);
      });
    })
    .end();

export const readFile = (path: string) =>
  fs.readFile(path, 'utf-8', () => {
    console.log('FS', Date.now() - start);
  });

const doWork = async (duration: number) => {
  const start = Date.now();

  console.log(`Starting ${duration}`);
  while (Date.now() - start < duration) {}

  return `Done ${duration}`;
};

// readFile('advancedNode/sectionOne/6.multitask.ts');
// createHash(start);
// doRequest('https://www.google.com');
// createHash(start);
// createHash(start);
// createHash(start);

// What will happen??
/**
 *  File will be interpreted immediately
 *  1. request made, this is handled by the OS directly, the CB will be added to the eventloop thread
 *  2. FS will read this file, this is handled by the threadpool
 *  3. createHash will execute 16 times, also handled by the thread pool
 *
 * event loop will look for timers, then os tasks and operations
 * request is os directly
 * readfile is threadpool
 * hash is threadpool
 *
 *  Expected outcome
 *  request
 *  FS + 3 create hash methods will execute together
 *  4 more hash will execute
 *  last hash will execute
 *
 *
 */

// these run in the event loop despite being async.
// They are executed together but the node single thread has to process each call
// one after the other.
// The result is - wait 6 seconds, log 'hello' then log the result of the doWork call

export const doWork2 = async (duration: number) => {
  const start = Date.now();

  console.log(`Starting doWork ${duration}`);
  for (let i = Date.now(); i - start < duration; i = Date.now()) {}
  console.log(`Completed doWork ${duration}`);
  return `Done ${duration}`;
};
const method = async (id: number) => console.log('method', id);

// doWork2(15000).then((result) => console.log('Logging doWork result', result));
// method(1);
// doWork2(2000).then((result) => console.log('Logging doWork result', result));
// method(2);
// console.log('Hello', Date.now() - start);
