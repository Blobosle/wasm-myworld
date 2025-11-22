# Automated WASM Minecraft Snapshot Journal

Website made using Web Assembly with emscripten C++, React, and Shell scripting, that automatically records and uploads screenshots taken inside of a Minecraft world.

## Purpose of the site

The Minecraft world being recorded is a "forever world" that is going to be played indefinitely, and the journaling work done is to keep a secure progression for looking back at in the future.

## Porting instructions

The automation part will need to be handled locally for the screenshots directory in the assets. WASM compilation with emscripten has been handled through CMake.

For compiling to Web Assembly.

```bash
$ cd wasm/build
$ emcmake cmake ..
$ emmake make
```

To build the entire project.

```bash
$ npm install
```
