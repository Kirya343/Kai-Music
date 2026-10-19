FROM node:22-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build