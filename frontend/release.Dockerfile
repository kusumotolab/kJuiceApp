FROM node:18-alpine AS builder

WORKDIR /app

COPY . /app
RUN npm install && npm run build

FROM nginx

COPY --from=builder /app/dist /dist
COPY ./release.default.conf /etc/nginx/conf.d/default.conf
