#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BUILD_DIR=${DIR}/../build

export NODE_ENV=build;
rm -rf ${BUILD_DIR}/*;
touch ${BUILD_DIR}/.gitkeep;
babel ${DIR}/../src --ignore ${DIR}/../src/**/*.test.js --out-dir ${BUILD_DIR};
cp ${DIR}/../package.json ${BUILD_DIR}/package.json;

