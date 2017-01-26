#define _GNU_SOURCE
#include "json.h"

void
json_foreach_print(const char *word, node_t *node, void *data) {
  (void) word;
  json_object *jobj, *parent = data;
  json_object *string, *array;

  jobj   = json_object_new_object();
  array  = json_object_new_array();
  string = json_object_new_string(node->word);

  json_object_object_add(jobj, "name", string);
  json_object_object_add(jobj, "children", array);
  json_object_array_add(parent, jobj);

  node_foreach_child(node, json_foreach_print, array);
}

void
json_print_dendro(dendro_t *dendro) {
  json_object *jobj, *array, *string;

  jobj   = json_object_new_object();
  array  = json_object_new_array();
  string = json_object_new_string("-");

  json_object_object_add(jobj, "name", string);
  json_object_object_add(jobj, "children", array);

  node_foreach_child(dendro->node, json_foreach_print, array);

  printf("%s", json_object_to_json_string(jobj));
  json_object_put(jobj);
}
