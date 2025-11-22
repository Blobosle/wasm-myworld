# Automated WASM Minecraft Snapshot Journal

<img width="1611" height="889" alt="imagen" src="https://github.com/user-attachments/assets/76e84d98-95c5-4819-bb3d-57398afd74f7" />

## Technicals

Website made using Web Assembly with emscripten C++, React, and Shell scripting, that automatically records and uploads screenshots taken inside of a Minecraft world.

## Purpose of the site

The Minecraft world being recorded is a "forever world" that is going to be played indefinitely, and the journaling work done is to keep a secure progression for looking back at in the future.

## Porting instructions

The automation part will need to be handled locally for the screenshots directory in the assets. WASM compilation with emscripten has been handled through CMake.

Make sure to have installed emscripten/embind dependencies.

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
