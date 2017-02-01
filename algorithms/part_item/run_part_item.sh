#!/bin/bash

DATASET=$1

SCRIPT_DIR=$(dirname $(readlink -f $0))

jq -r '.author_name + "|" + .part_name' $DATASET | "$SCRIPT_DIR/part_item.rb"
