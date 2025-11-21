#include <dirent.h>
#include <unistd.h>
#include <string>
#include <emscripten/bind.h>
#include <assert.h>

// #define PATH ("../assets/screenshots")

using namespace emscripten;

std::vector<std::string> g_filenames;
size_t cur_top;

std::string deb(std::string path) {
    return path;
}

void init(std::string path) {
    g_filenames.clear();

    DIR* dir = opendir(path.c_str());
    if (!dir) {
        perror("dir");
        exit(0);
    }

    struct dirent* entry = nullptr;

    while ((entry = readdir(dir)) != nullptr) {
        if ((std::string(entry->d_name) == ".") ||
            (std::string(entry->d_name) == "..")) {
            continue;
        }

        g_filenames.emplace_back(entry->d_name);
    }

    closedir(dir);

    cur_top = g_filenames.size() - 1;
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
    function("deb", deb);
}
