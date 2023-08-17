/**
 * ** REFACTOR **
 * HOW DOES NODE EXECUTE C++
 *
 * To execute C++ code, NODE uses a method attached to the process object called 'binding'.
 *
 * process.binding(loadFile())
 *
 * HOW IT WORKS!
 * C++ is used to achieve the majority of tasks set by NODE JS. The process is as follows:
 *
 * JS File -> NODE API -> process.binding() -> V8 -> NODE C++ -> LIBUV <<- ** important **
 * PBK2V   -> crypto   -> C++.PBK2V(s,i,b)  ->    -> PBK2V    -> threads, processing
 *
 *
 * V8 acts as an intermediary between C++ and JS. It is used in the CPP files to import the C++ definition for the JS counterpart.
 * - i.e. when a JS calls a NODE API method and parses a boolean value, V8 translates that value into something C++ can interpret.
 *
 * LIBUV is used for a lot of processing and concurrency constructs inside the C++ side of NODE.
 * Searching for 'uv' in the C++ files will bring up results such as:
 *   - uv_work
 *   - uv_queue
 *   - uv_thread
 */
