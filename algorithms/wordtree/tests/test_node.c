#include "test_node.h"

void
node_compact_complex_test() {
  int i;
  node_t *node, *child;
  char *words1[] = {"f1", "f2", "f3", "f4"};
  char *words2[] = {"f1", "f2", "b1", "b2"};

  node = node_new(NULL);

  child = node;
  for(i = 0; i < 4; i++)
    child = node_upsert_child(child, words1[i]);

  child = node;
  for(i = 0; i < 4; i++)
    child = node_upsert_child(child, words2[i]);

  node_compact(node);

  assert_string_equal(node->word, "f1 f2");

  child = node_get_child(node, 0);
  assert_string_equal(child->word, "f3 f4");

  child = node_get_child(node, 1);
  assert_string_equal(child->word, "b1 b2");

  node_free(node);
}

void
node_compact_test() {
  int i;
  node_t *node, *child;
  char *words[] = {"f1", "f2", "f3", "f4"};
  char compacted[] = "f1 f2 f3 f4";

  child = node = node_new(words[0]);

  for(i = 1; i < 4; i++)
    child = node_upsert_child(child, words[i]);

  node_compact(node);

  assert_string_equal(node->word, compacted);

  node_free(node);
}

void
node_compact_itself_test() {
  node_t *node;

  node = node_new("f");
  node_upsert_child(node, "b");

  node_compact_itself(node);

  assert_int_equal(node_size(node), 0);

  assert_string_equal(node->word, "f b");

  node_free(node);
}

void
node_child_test() {
  node_t *node, *child1, *child2;

  node   = node_new("f");
  child1 = node_upsert_child(node, "b1");
  child2 = node_upsert_child(node, "b2");

  assert_int_equal(node_size(node), 2);

  assert_ptr_equal(node_get_child(node, 1), child1);
  assert_ptr_equal(node_get_child(node, 0), child2);
  assert_null(node_get_child(node, 2));

  node_free(node);
}

void
node_test() {
  node_t *node, *child;

  node = node_new("f");
  assert_string_equal(node->word, "f");

  child = node_upsert_child(node, "b");
  assert_string_equal(child->word, "b");

  node_free(node);
}

int
main() {
  const struct CMUnitTest tests[] = {
    cmocka_unit_test(node_test),
    cmocka_unit_test(node_child_test),
    cmocka_unit_test(node_compact_itself_test),
    cmocka_unit_test(node_compact_test),
    cmocka_unit_test(node_compact_complex_test),
  };

  return cmocka_run_group_tests(tests, NULL, NULL);
}
