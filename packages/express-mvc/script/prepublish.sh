#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BUILD_DIR=${DIR}/../build

echo "!!!!PREPUB!"
cp ${DIR}/../package.json ${BUILD_DIR}/package.json;
