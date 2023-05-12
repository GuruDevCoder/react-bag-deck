FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn install
COPY . .
RUN yarn build
RUN mv /usr/src/dist /public
COPY ./src/images /public/images