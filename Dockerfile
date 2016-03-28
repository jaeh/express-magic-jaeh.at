# wizardsatwork/grundstein/postgres dockerfile
# VERSION 0.0.1

FROM wiznwit:magic

MAINTAINER Jascha Ehrenreich <jascha@jaeh.at>
ENV REFRESHED_AT 2016-28-03

WORKDIR /srv

COPY package.json ./

ARG NODE_ENV
ARG CACHEBUST

ENV NODE_ENV=production

RUN npm install --verbose --production

COPY src ./src/
COPY .babelrc ./

RUN cp node_modules/magic-root/bin/cli.sh .

RUN ./cli.sh build-src

CMD ["node", "dist/index.js"]
