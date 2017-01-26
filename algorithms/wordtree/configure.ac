AC_PREREQ([2.69])
AC_INIT([dendro], [0.1.0], [michel.boaventura@gmail.com])
AC_CONFIG_SRCDIR([src/main.c])
AM_INIT_AUTOMAKE([foreign subdir-objects -Wall -Werror])

AM_SILENT_RULES([yes])

AC_CONFIG_FILES([Makefile])

# Checks for programs.
AC_PROG_CC
AC_PROG_INSTALL

# Checks for valgrind.
m4_include([m4/ax_valgrind_check.m4])
AX_VALGRIND_DFLT([sgcheck], [off])
AX_VALGRIND_CHECK

# Checks for header files.
AC_CHECK_HEADERS([limits.h stdint.h stdlib.h string.h])

# Checks for typedefs, structures, and compiler characteristics.
AC_TYPE_SIZE_T
AC_TYPE_UINT32_T

# Checks for library functions.
AC_FUNC_MALLOC
AC_CHECK_FUNCS([memset strdup])

PKG_CHECK_MODULES([JSONC], [json-c])

#Checks for cmocka, used in tests
AC_ARG_WITH([cmocka], AS_HELP_STRING([--without-cmocka], [Disable tests]))

AS_IF(
  [test "x$with_cmocka" != "xno"],
  [PKG_CHECK_MODULES(
    [CMOCKA], [cmocka >= 1.0.0], [have_cmocka=yes], [have_cmocka=no])],
  [have_cmocka=no])

AS_IF(
  [test "x$have_cmocka" = "xyes"],
  [],
  [AS_IF(
    [test "x$with_cmocka" = "xyes"],
    [AC_MSG_ERROR([cmocka requested but not found])])])

AM_CONDITIONAL([CMOCKA], [test "x$have_cmocka" = "xyes"])

AC_OUTPUT
