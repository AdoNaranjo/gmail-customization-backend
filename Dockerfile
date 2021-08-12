FROM node:lts-alpine

WORKDIR /app

ARG ENV
ENV BUILD_ENV=$ENV

RUN apk add --update \
    git \
    openssh \
    python \
    python-dev \
    py-pip \
    build-base \
    && pip install virtualenv \
    && rm -rf /var/cache/apk/*

COPY . .

RUN yarn global add nodemon

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["nodemon", "--watch", ".env", "dist/server.js"]
