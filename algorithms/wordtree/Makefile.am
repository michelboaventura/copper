bin_PROGRAMS = dendro

dendro_SOURCES = src/dendro.c src/dendro.h src/node.c src/node.h src/khash.h \
                 src/main.h src/main.c src/json.h src/json.c
dendro_LDADD   = $(JSONC_LIBS)
dendro_CFLAGS  = $(JSONC_CFLAGS)

if CMOCKA
@VALGRIND_CHECK_RULES@

TESTS = tests/test_dendro tests/test_node tests/test_json

check_PROGRAMS = $(TESTS)
tests_test_dendro_SOURCES = tests/test_dendro.c tests/test_dendro.h \
                            src/dendro.h src/dendro.c src/node.h src/node.c
tests_test_dendro_LDADD   = $(CMOCKA_LIBS)
tests_test_dendro_CFLAGS  = $(CMOCKA_CFLAGS)

tests_test_node_SOURCES = tests/test_node.c tests/test_node.h src/node.h \
                          src/node.c
tests_test_node_LDADD   = $(CMOCKA_LIBS)
tests_test_node_CFLAGS  = $(CMOCKA_CFLAGS)

tests_test_json_SOURCES = tests/test_json.c tests/test_json.h src/json.h \
                          src/json.c src/node.c src/node.h
tests_test_json_LDADD   = $(CMOCKA_LIBS)   $(JSONC_LIBS)
tests_test_json_CFLAGS  = $(CMOCKA_CFLAGS) $(JSONC_CFLAGS)
endif
