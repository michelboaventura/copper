#ifndef _DENDRO_H_
#define _DENDRO_H_

#include <stdint.h>
#include <stdio.h>
#include "node.h"

typedef struct dendro_t {
  node_t *node;
  node_t *inc;
} dendro_t;

dendro_t *dendro_new();
void dendro_free(dendro_t *dendro);
void dendro_print(dendro_t *dendro);
void dendro_add(dendro_t *dendro, char **words, uint32_t size);
void dendro_compact(dendro_t *dendro);
void dendro_add_incremental(dendro_t *dendro, char *word);
void dendro_finish_incremental(dendro_t *dendro);

#endif
