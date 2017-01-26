#include "test_dendro.h"

char *words1[] = {"f1", "f2", "f3", "f4"};
char *words2[] = {"f1", "f2", "b1", "b2"};
char size = 4;

void
dendro_compact_test() {
  dendro_t *dendro = dendro_new();
  node_t *child;

  dendro_add(dendro, words1, 4);
  dendro_add(dendro, words2, 4);

  dendro_compact(dendro);

  child = dendro->node;

  assert_string_equal(child->word, "f1 f2");

  dendro_free(dendro);
}

void
dendro_test() {
  int i;
  dendro_t *dendro;
  node_t *child;

  dendro = dendro_new();
  dendro_add(dendro, words1, size);

  child = dendro->node;
  for(i = 0; i < size; i++) {
    child = node_upsert_child(child, words1[i]);
    assert_string_equal(child->word, words1[i]);
  }

  dendro_free(dendro);
}

void
dendro_incremental_test() {
  int i;
  dendro_t *dendro;
  node_t *child;

  dendro = dendro_new();
  assert_ptr_equal(dendro->node, dendro->inc);

  for(i = 0; i < size; i++)
    dendro_add_incremental(dendro, words1[i]);

  dendro_finish_incremental(dendro);
  assert_ptr_equal(dendro->node, dendro->inc);

  child = dendro->node;
  for(i = 0; i < size; i++) {
    child = node_upsert_child(child, words1[i]);
    assert_string_equal(child->word, words1[i]);
  }

  dendro_free(dendro);
}

int
main() {
  const struct CMUnitTest tests[] = {
    cmocka_unit_test(dendro_test),
    cmocka_unit_test(dendro_incremental_test),
    cmocka_unit_test(dendro_compact_test),
  };

  return cmocka_run_group_tests(tests, NULL, NULL);
}
