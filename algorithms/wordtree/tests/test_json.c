#include "test_json.h"

void json_test() {
}

int main() {
  const struct CMUnitTest tests[] = {
    cmocka_unit_test(json_test),
  };

  return cmocka_run_group_tests(tests, NULL, NULL);
}
