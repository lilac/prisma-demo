FROM node as build-deps

WORKDIR /usr/src/app

ADD package.json .

RUN yarn config set registry https://registry.npm.taobao.org -g
RUN yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
RUN yarn config set sass_binary_site https://cdn.npm.taobao.org/dist/node-sass -g
RUN yarn config set phantomjs_cdnurl https://cdn.npm.taobao.org/dist/phantomjs -g
RUN yarn

ADD . .
RUN yarn build

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 80