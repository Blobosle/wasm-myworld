#include <dirent.h>
#include <unistd.h>
#include <string>
#include <emscripten/bind.h>
#include <assert.h>

// #define PATH ("../assets/screenshots")

using namespace emscripten;

std::vector<std::string> g_filenames;
size_t cur_top;

void init(val jsArray) {
    g_filenames.clear();

    unsigned len = jsArray["length"].as<unsigned>();
    g_filenames.reserve(len);

    for (unsigned i = 0; i < len; ++i) {
        g_filenames.emplace_back(jsArray[i].as<std::string>());
    }

    if (!g_filenames.empty()) {
        cur_top = g_filenames.size() - 1;
    } else {
        cur_top = 0;
    }
}

std::string get_primary() {
    assert(cur_top >= 1);
    return g_filenames[cur_top];
}

std::string get_secondary() {
    assert(cur_top >= 1);
    return g_filenames[cur_top - 1];
}

void go_next() {
    if (cur_top < 2) {
        return;
    }

    cur_top--;
}

void go_prev() {
    if (cur_top + 1 >= g_filenames.size()) {
        return;
    }

    cur_top++;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("init", init);
    function("go_prev", go_prev);
    function("go_next", go_next);
    function("get_primary", &get_primary);
    function("get_secondary", &get_secondary);
}
