# Builds React Application
FROM node:12-alpine as build-stage
ENV NODE_ENV production
# For eslint package. Check package.json file -> eslint-config-rallycoding
RUN apk add git
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Copies built application and serves it with Nginx
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
