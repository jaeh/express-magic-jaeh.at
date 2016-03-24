# wizardsatwork/grundstein/postgres dockerfile
# VERSION 0.0.1

FROM mhart/alpine-node:5.9.1

MAINTAINER Wizards & Witches <dev@wiznwit.com>
ENV REFRESHED_AT 2016-25-03

RUN apk add --no-cache git bash make

WORKDIR /srv

COPY package.json ./

ARG NODE_ENV
ARG CACHEBUST

RUN npm install --verbose --production

ENV NODE_ENV=production

COPY src ./src/
COPY Makefile .babelrc ./

RUN cp node_modules/magic-root/bin/cli.sh .

RUN ./cli.sh build-src

CMD ["node", "dist/index.js"]
