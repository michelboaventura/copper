#ifndef _BLOCK_H_
#define _BLOCK_H_

#include <stdint.h>
#include <stdio.h>
#include "khash.h"

typedef struct node_t node_t;

KHASH_MAP_INIT_STR(string, node_t *)

typedef struct node_t {
  char *word;
  khash_t(string) *children;
} node_t;

typedef void (*node_foreach_fn)(const char *word, node_t *node, void *data);

node_t *node_new(char *word);
node_t *node_upsert_child(node_t *node, char *word);
void node_print(node_t *node);
void node_print_with_data(node_t *node, void *data);
void node_free(node_t *node);
void node_compact_itself(node_t *node);
void node_compact(node_t *node);
node_t *node_get_child(node_t *node, uint32_t child);
size_t node_size(node_t *node);

void node_foreach_child(node_t *node, node_foreach_fn fn, void *data);

#endif
