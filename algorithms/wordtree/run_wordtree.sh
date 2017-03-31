#!/bin/bash

DATASET_INPUT=$1

SCRIPT_DIR=$(dirname $(readlink -f $0))

BIN_DENDRO="$SCRIPT_DIR/dendro"

# Compilando dendro
if [ ! -x $BIN_DENDRO ]; then
  pushd $SCRIPT_DIR &> /dev/null
  ./autogen.sh &> /dev/null
  ./configure &> /dev/null
  make -j &> /dev/null
  popd &> /dev/null
fi

cat $DATASET_INPUT | "$SCRIPT_DIR/dendro"
