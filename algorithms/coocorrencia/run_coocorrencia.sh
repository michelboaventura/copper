#!/bin/bash

DATASET_INPUT=$1
SUPPORT=$2

SCRIPT_DIR=$(dirname $(readlink -f $0))

jq -r '.text' $DATASET_INPUT | "$SCRIPT_DIR/coocorrencia.rb" $SUPPORT
