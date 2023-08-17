/**
 * WHAT IS NODE
 *
 * Node is an application with dependencies like any other JS. When it is invoked on the command line with a JS file,
 * it will use those dependencies to execute the file and code within.
 *
 * what are dependencies?
 * Node has several dependencies but two of the main ones are Chrome V8 engine and Libuv
 *  - The V8 engine allows JS to be executed outside the browser, such as in a terminal
 *    - ~70% C++
 *  - Libuv provides access to the operating systems underlying file system, also networking and some concurrency.
 *    - 100% C++
 *
 * Node also provides a set of wrappers containing apis for things like path, http, fileSystem, crypto without using c++ code
 *
 *
 *
 *
 *                           JS                  100 % js
 *              ----------------------------
 * 50% C++                  node
 *              ----------------------------
 * 70% C++          V8       |   libuv           100 % C++
 *
 *
 *
 *
 *
 */
