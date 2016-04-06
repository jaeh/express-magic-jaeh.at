export CONTAINER_NAME=jaeh-at

# default arguments:
# export NODE_BIN=node_modules/.bin
# export CONTAINER_NAME=magic-localhost
# export JS_ROOT_DIR=src/js
# export MAGIC_BIN=node_modules/magic-root/bin
# export NODEJS_SRC_FILES=src/config.js src/index.js
# export NODEJS_OUT_FILE=out/index.js

CLI:=./cli.sh

.PHONY: \
	all \
	dev \
	build \
	build-root \
	build-src \
	install \
	lint \
	eslint \
	eslint-fix \
	jade-lint \
	pug-lint \
	stylint \
	clean \
	debug \
	logs \
	rm \
	run \
	ip \
	update \
	status \
	help


# TASKS

all: dev

dev:
	${CLI} $@

build:
	${CLI} $@

build-root:
	${CLI} $@

build-src:
	${CLI} $@

install:
	${CLI} $@

lint:
	${CLI} $@

eslint:
	${CLI} $@

eslint-fix:
	${CLI} $@

jade-lint:
	${CLI} $@

pug-lint:
	${CLI} $@

stylint:
	${CLI} $@

clean:
	${CLI} $@

debug:
	${CLI} $@

logs:
	${CLI} $@

rm:
	${CLI} $@

run:
	${CLI} $@

ip:
	${CLI} $@

update:
	${CLI} $@

status:
	${CLI} $@

help:
	${CLI} $@
