/**
 * EVENT LOOP
 *
 * When node starts to run a program it creates a single thread. The thread contains all the commands the program issues.
 * Inside the thread is the event loop. The event loop controls what the thread is doing at any given time.
 */

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// Node makes three checks to decide if the event loop should continue to run
const shouldContinue = () => {
  // Check one: Any pending setTimeout, setInterval or setImmediate
  // Check two: Any pending OS tasks, ie server listening to a given port
  // Check three: Any pending long running operations, such as FS module
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
};

/**
 * node file.js
 * when node starts up it interprets the entire contents of the file, during this process
 * new timers, tasks and operations are recorded
 */
let file;
file.runContents();

// This loop represents the event loop, each iteration is referred to as a 'tick'. One loop = One tick
// Like a while loop, the event loop checks to see if it should run before each iteration.
while (shouldContinue()) {
  // 1. node checks pendingTimeouts to see if any functions are ready to be called; for setTimeout and setInterval
  // 2. Node checks pendingTasks and pendingOperations and calls relevant callbacks
  // 3. Pause execution. Continue when:  To visualise, node calls some callbacks from step 1&2, waits for them to complete and then continues.
  // - a new pendingTask is done
  // - a new pendingOperation is done
  // - a timer is about to complete
  // 4. Checks pendingTimers again, but only looks for setImmediate
  // 5. Handle any 'close' events
}

// exit back to terminal
