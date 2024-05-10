FROM node:20 AS build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# запуск собранного ранее приложения в контейнере
FROM node:alpine

RUN npm install -g serve

COPY --from=build ./build ./build

EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build"]