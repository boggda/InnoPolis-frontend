FROM docker.io/node:18-alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

WORKDIR /app

RUN apk add git

COPY package*.json ./

RUN npm ci --production=false

COPY . .

CMD npm run build && npm start
