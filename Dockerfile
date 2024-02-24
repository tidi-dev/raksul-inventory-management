FROM node:16-alpine as development

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

COPY src/database/schema.prisma src/database/schema.prisma

RUN yarn install

COPY . .

RUN yarn prisma generate

USER node

EXPOSE 3001

CMD ["yarn", "start"]
