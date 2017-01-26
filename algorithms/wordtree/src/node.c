#include "node.h"

node_t *
node_new(char *word) {
  node_t *node;

  node = malloc(sizeof(node_t));

  node->word = word ? strdup(word) : NULL;
  node->children = kh_init(string);

  return node;
}

node_t *
node_upsert_child(node_t *node, char *word) {
  int absent;
  khint_t k;

  k = kh_put(string, node->children, word, &absent);

  if(absent) {
    kh_key(node->children, k) = strdup(word);
    kh_value(node->children, k) = node_new(word);
  }

  k = kh_get(string, node->children, word);

  return kh_val(node->children, k);
}

void
node_foreach_child(node_t *node, node_foreach_fn fn, void *data) {
  node_t *child;
  const char *word;

  kh_foreach(node->children, word, child, fn(word, child, data));
}

void
node_foreach_child_print(const char *word, node_t *node, void *data) {
  (void) word;
  (void) data;
  node_print(node);
}

void
node_print(node_t *node) {
  if(node->word)
    printf("(%s", node->word);

  node_foreach_child(node, node_foreach_child_print, NULL);

  if(node->word)
    printf(")");
}

void
node_internal_cb(node_t *node, const char *key, int deep) {
  khint_t k;

  k = kh_get(string, node->children, key);
  kh_del(string, node->children, k);
  free((char *) key);

  if(deep)
    node_free(node);
}

void
node_internal_free(node_t *node, int deep) {
  const char *word;
  node_t *child;

  kh_foreach(node->children, word, child, node_internal_cb(child, word, deep));

  kh_destroy(string, node->children);

  if(deep) {
    free(node->word);
    free(node);
  }
}

void
node_shallow_free(node_t *node) {
  node_internal_free(node, 0);
}

void
node_free(node_t *node) {
  node_internal_free(node, 1);
}

node_t *
node_get_child(node_t *node, uint32_t n) {
  uint32_t i, acc;

  acc = 0;

  for(i = kh_begin(node->children), acc = 0; i != kh_end(node->children); ++i) {
    if(!kh_exist(node->children, i)) continue;

    if(acc == n)
      return kh_val(node->children, i);
    else
      acc++;
  }

  return NULL;
}

size_t
node_size(node_t *node) {
  return kh_size(node->children);
}

/* If a node has only one child this function merge both parent and child into a
 * single node. It is supposed to be used on a finished tree, since it will make
 * the node key different from the hash key used by its parent */
void
node_compact_itself(node_t *node) {
  node_t *child;
  uint32_t str_size;
  char *new_word;

  if(node_size(node) != 1) return;

  child = node_get_child(node, 0);

  /* Merging the two words. The size is node->word + " " + child->word + '\0'.
   * We check only for a valid node->word because a child always has a valid
   * word. This just protect us if the parent node has no word. */
  str_size = 2 + strlen(child->word) + (node->word ? strlen(node->word) : 0);
  new_word = malloc(sizeof(char) * str_size);

  if(node->word)
    sprintf(new_word, "%s %s", node->word, child->word);
  else
    sprintf(new_word, "%s", child->word);

  node_shallow_free(node);
  free(node->word);
  node->word = new_word;

  /* Pointing my hash to my child's hash */
  node->children = child->children;

  /* Cleaning up */
  free(child->word);
  free(child);
}

void
node_internal_compact(const char *word, node_t *node, void *data) {
  (void) word;
  node_foreach_child(node, node_internal_compact, data);
  node_compact_itself(node);
}

void
node_compact(node_t *node) {
  node_internal_compact(NULL, node, NULL);
}
