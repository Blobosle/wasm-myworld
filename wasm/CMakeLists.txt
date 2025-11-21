cmake_minimum_required(VERSION 3.31)
project(myworld)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

file(GLOB SOURCES src/*.cpp)

# Added strictly for the compile_command.json file
set(EMSCRIPTEN_BIND
    "/opt/homebrew/Cellar/emscripten/4.0.19/libexec/system/include")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/../src/wasm")
set(PUBLIC_DIR "${CMAKE_SOURCE_DIR}/../public")

add_executable(image_fetcher ${SOURCES})

target_include_directories(image_fetcher SYSTEM PRIVATE ${EMSCRIPTEN_BIND})
target_link_options(image_fetcher PRIVATE "-lembind"
    "-sEXPORT_ES6=1"
    "-sEXPORTED_RUNTIME_METHODS=['FS']"
)

add_custom_command(TARGET image_fetcher POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E make_directory "${PUBLIC_DIR}"
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        "$<TARGET_FILE_DIR:image_fetcher>/image_fetcher.wasm"
        "${PUBLIC_DIR}/image_fetcher.wasm"
    COMMENT "Copying image_fetcher.wasm to public/"
)
