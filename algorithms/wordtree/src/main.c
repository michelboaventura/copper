#include "main.h"
#define BUFF_SIZE 1000

int
main(void) {
  size_t buff_size = BUFF_SIZE;
  char *line, *word;
  char sep[] = " \n.,";
  dendro_t *dendro;

  line = malloc(sizeof(char) * BUFF_SIZE);

  dendro = dendro_new();

  while(getline(&line, &buff_size, stdin) != -1) {
    word = strtok(line, sep);

    do {
      dendro_add_incremental(dendro, word);
    } while((word = strtok(NULL, sep)));

    dendro_finish_incremental(dendro);
  }

  json_print_dendro(dendro);

  free(line);

  dendro_free(dendro);

  return 0;
}
