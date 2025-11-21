#include <emscripten/bind.h>

using namespace emscripten;

void init() {

}

int calc(int x, int y) {
    return x + y;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("calc", calc);
    function("init", init);
}
