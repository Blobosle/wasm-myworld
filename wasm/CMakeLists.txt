cmake_minimum_required(VERSION 3.31)
project(myworld)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

file(GLOB SOURCES src/*.cpp)

# Added strictly for the compile_command.json file
set(EMSCRIPTEN_BIND
    "/opt/homebrew/Cellar/emscripten/4.0.19/libexec/system/include")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/../src/wasm")

add_executable(image_fetcher ${SOURCES})

target_include_directories(image_fetcher SYSTEM PRIVATE ${EMSCRIPTEN_BIND})
target_link_options(image_fetcher PRIVATE "-lembind"
    "-sEXPORT_ES6=1"
    "--preload-file"
    "../../src/assets/screenshots@/screenshots"
    "-sEXPORTED_RUNTIME_METHODS=['FS']"
)

