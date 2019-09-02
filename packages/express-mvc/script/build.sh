#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SRC_DIR=${DIR}/../src
BUILD_DIR=${DIR}/../build

export NODE_ENV=build;
rm -rf ${BUILD_DIR}/*;
touch ${BUILD_DIR}/.gitkeep;
babel ${SRC_DIR} --ignore ${SRC_DIR}/**/*.test.js --out-dir ${BUILD_DIR} --extensions ".ts,.js";
cd ${BUILD_DIR};
ln -s ../package.json ./;
rm -f ./*.d.js
cp -f ${SRC_DIR}/index.d.ts ./;
