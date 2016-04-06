# wizardsatwork/grundstein/postgres dockerfile
# VERSION 0.0.1

FROM wiznwit:magic

MAINTAINER Jascha Ehrenreich <jascha@jaeh.at>
ENV REFRESHED_AT 2016-28-03

WORKDIR /srv

COPY package.json ./

ARG NODE_ENV

ENV NODE_ENV=production

RUN npm install --verbose --production

COPY src ./src/
COPY .babelrc ./

ENV DIST_DIR=dist/
ENV SERVER_SRC_FILES=src/server
ENV CLIENT_SRC_FILES=src/client

RUN ./build.sh

CMD ["node", "dist/index.js"]
