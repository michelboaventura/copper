#include "dendro.h"

dendro_t *
dendro_new() {
  dendro_t *dendro;

  dendro = malloc(sizeof(dendro_t));
  dendro->node = node_new(NULL);
  dendro->inc = dendro->node;

  return dendro;
}

void
dendro_print(dendro_t *dendro) {
  node_print(dendro->node);
}

void
dendro_free(dendro_t *dendro) {
  node_free(dendro->node);
  free(dendro);
}

void
dendro_add_incremental(dendro_t *dendro, char *word) {
  dendro->inc = node_upsert_child(dendro->inc, word);
}

/* This function adds 'size' words on dendro. It initializes dendro->inc to
 * begin, different from dendro_add_incremental */
void
dendro_add(dendro_t *dendro, char **words, uint32_t size) {
  uint32_t i;

  dendro_finish_incremental(dendro);

  for(i = 0; i < size; i++)
    dendro_add_incremental(dendro, words[i]);
}

void
dendro_finish_incremental(dendro_t *dendro) {
  dendro->inc = dendro->node;
}

void
dendro_compact(dendro_t *dendro) {
  node_compact(dendro->node);
}
