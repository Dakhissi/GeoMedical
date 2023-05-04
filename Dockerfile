FROM node:18


WORKDIR usr/src/app

COPY . . 

RUN yarn install


CMD ["yarn", "run", "dev"]


