#!/usr/bin/env bash

NODE_BIN=${NODE_BIN:-node_modules/.bin}
CONTAINER_NAME=${CONTAINER_NAME:-magic-localhost}
MAGIC_DIR=${MAGIC_DIR:-node_modules/magic-root}
MAGIC_BIN=${MAGIC_BIN:-node_modules/magic-root/bin}
NODEJS_SRC_FILES=${NODEJS_FILES:-"src/server"}
NODEJS_DIST_DIR=${NODEJS_DIST_DIR:-"dist"}
CLIENT_SRC_FILES=${CLIENT_SRC_FILES:-"src/client"}

DIST_DIR=${DIST_DIR:-dist}

function echo-start() {
  echo "START: $@"
}

function echo-end() {
  echo "FINISHED: $@"
}

function dev() {
  echo-start "dev environment"

  export NODE_ENV=development;
  $NODE_BIN/nodemon \
    --exec "$NODE_BIN/babel-node src/server/index.js" \
    --watch ./src/server/
}

function build() {
  echo-start "building $CONTAINER_NAME docker container"

  docker build \
  --tag $CONTAINER_NAME \
  --build-arg NODE_ENV=production \
    . # dot!

  echo-end "building docker container"
}

function build-root() {
  echo-start "building magic-root"

  ${MAGIC_DIR}/cli.sh docker-build

  echo-end "building magic-root"
}

function build-node-js() {
  echo-start "building nodejs"

  mkdir -p $DIST_DIR/

  $NODE_BIN/babel \
    --out-dir $NODEJS_DIST_DIR \
    $NODEJS_SRC_FILES # order is important

  echo-end "building nodejs"
}

function build-express-dirs() {
  echo-start "copying express views and public dir"

  mkdir -p $DIST_DIR/

  cp -r \
    $CLIENT_SRC_FILES \
    $DIST_DIR/client/

  echo-end "copying express views and public dir"
}

function run() {
  docker-rm

  echo-start "docker container"
  docker run \
    --name $CONTAINER_NAME \
    --detach \
    --env DIST_DIR=$DIST_DIR \
    --env SERVER_SRC_FILES=$NODEJS_SRC_FILES \
    --env CLIENT_SRC_FILES=$CLIENT_SRC_FILES \
    $CONTAINER_NAME

  ip
}

function ip() {
  echo-start "gather ip"

  ip=$(python ./bin/ip.py $CONTAINER_NAME)
  echo $ip > ./SERVER_IP

  echo-end "container $CONTAINER_NAME started with ip: $ip"
}

function docker-rm() {
  echo-start "delete docker container"

  docker rm -f $CONTAINER_NAME

  echo-end "delete docker container"
}

function lint() {
  echo-start "lint tasks"

  eslint
  jade-lint
  stylint

  echo-end "linting"
}

function eslint() {
  echo-start "eslint"

  $NODE_BIN/eslint \
    src

  echo-end "eslint"
}

function eslint-fix() {
  echo-start "lint-fix"

  $NODE_BIN/eslint \
    --fix \
    src

  echo-end "lint-fix"
}

function install() {
  echo-start "install magic-root including devDependencies"

  npm i --dev

  echo-end "install magic-root including devDependencies"
}

function pug-lint() {
  echo-start "pug-lint"

  $NODE_BIN/pug-lint \
    $CLIENT_SRC_FILES/views/*

  echo-end "pug-lint"
}

function stylint() {
  echo-start "stylint"

  $NODE_BIN/stylint \
    $CLIENT_SRC_FILES/public/css

  echo-end "stylint"
}

function clean() {
  echo-start "cleaning up out dir"

  rm -rf $DIST_DIR

  echo-end "cleaning up"
}

function logs() {
  echo-start "connecting to container logs: $CONTAINER_NAME"
  docker logs --follow $CONTAINER_NAME
}

function debug() {
  docker-rm
  build

  echo-start "connecting to container $CONTAINER_NAME"
  docker run \
    --interactive \
    --tty \
    --name "$CONTAINER_NAME" \
    --entrypoint=sh "$CONTAINER_NAME"
}

function update() {
  git pull
}

function status() {
  git status
}

function help() {
  echo "
make [task]

running make without task starts a dev env

dev       - run dev environment
lint      - eslint javascript sources
lint-fix  - eslint and fix javascript sources
pug-lint  - run pug-lint (html)
jade-lint - run pug-lint (html)
stylint   - run stylint (css)

build     - build docker container
run       - run docker container
clean     - remove build library and test files
debug     - connect to a debug container
logs      - tail the logs of the running container
clean     - remove out dir
update    - git pull
status    - git status
docker-rm - remote docker container
"
}

if [ $1 ]
then
  function=$1
  shift
  $function $@
else
  help $@
fi
