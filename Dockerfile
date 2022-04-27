FROM node:14-alpine

LABEL maintainer="Napat Srichantapong <tot1488@gmail.com>"

WORKDIR /home/apit

RUN apk update && \
 apk upgrade && \
 apk add --no-cache && \
 alpine-sdk git python \
 build-base libtool autoconf \
 automake gzip g++ \
 make tzdata \
 && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
 && echo "Asia/Bangkok" > /etc/timezone

COPY ...

RUN npm i && npm run build:dist

EXPOSE 8080

CMD ["node","./dist/server.js"]
