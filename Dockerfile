# wizardsatwork/grundstein/postgres dockerfile
# VERSION 0.0.1

FROM magic:root

MAINTAINER Jascha Ehrenreich <jascha@jaeh.at>
ENV REFRESHED_AT 2016-25-03

WORKDIR /srv

COPY package.json ./

RUN npm install --verbose --production

ENV NODE_ENV=production

COPY src ./src/
COPY .babelrc ./

RUN ./cli.sh build-src

CMD ["node", "dist/index.js"]
