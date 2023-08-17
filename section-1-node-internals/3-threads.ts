/**
 * THREADS
 *
 * What are Threads
 * - Threads are units of instructions waiting to be processed by the CPU
 * - The CPU will execute on instruction at a time
 * - When a thread needs to wait for something, such as I/O reads/writes the system Scheduler can detect the downtime and start working on another thread.
 * - The scheduling is controlled by the OS
 * - Speeds of processing can be improved by adding more cores or increasing the number of threads processed by the CPU.
 */
import crypto from 'crypto';
import { promisify } from 'util';

process.env.UV_THREADPOOL_SIZE = process.argv[2] || '8'; // change the number of threads created by LIBUV
const start = Date.now();
/**
 * This method demonstrates the ability of Node to use multiple threads for computational expensive tasks
 *
 * Each call to pbkdf2 will take around 1 second to complete. If Node used the event loop to do this
 * it would hold up execution of anything else for the duration. This would make the program slow and
 * appear to have crashed.
 *
 * This principle is illustrated in the method calls below. libuv allows for 4 threads outside of the event loop
 * The first 4 calls will take 1 second to complete, but the 5th call will take about 2 seconds, due to being
 * held up by the initial 4.
 *
 * Time | threads
 * --------------------------------------------------
 *   1  | pbkdf2 1 | pbkdf2 2 | pbkdf2 3 | pbkdf2 4 |
 * --------------------------------------------------
 *   2  | pbkdf2 5 |          |          |          |
 * --------------------------------------------------
 *
 * threads.ts -> Node -> V8 -> libuv -> thread pool x4 -> OSScheduler -> cpu <<-
 */

const wait = (id: any, time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });

const pbkdf2 = promisify(crypto.pbkdf2);

Array(parseInt(process.argv[3], 10))
  .fill(null)
  .forEach(async (_el, idx) => {
    console.log('starting async', idx + 1);
    await wait(idx + 1, 1);
    console.log('completed async', Date.now() - start);
  });

Array(parseInt(process.argv[3], 10))
  .fill(null)
  .forEach(async (_el, idx) => {
    console.log('starting pbkdf2', idx + 1);
    await pbkdf2('a', 'b', 600000, 512, 'sha512');
    console.log('completed pbkdf2', idx + 1, Date.now() - start);
  });

setTimeout(() => console.log('completed timeout', 1345), 1345);
setTimeout(() => console.log('completed timeout', 1000), 1000);
setTimeout(() => console.log('completed timeout', 890), 890);
setTimeout(() => console.log('completed timeout', 500), 500);
