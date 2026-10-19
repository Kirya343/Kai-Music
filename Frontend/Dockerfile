FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

RUN node .yarn/releases/yarn-4.16.0.cjs install --immutable

COPY . .

RUN node .yarn/releases/yarn-4.16.0.cjs build

EXPOSE 5173

CMD ["node", ".yarn/releases/yarn-4.16.0.cjs", "dev", "--host", "0.0.0.0", "--port", "5173"]