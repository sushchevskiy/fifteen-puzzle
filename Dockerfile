FROM node:12.18.3-alpine3.11 as builder

COPY package.json package-lock.json ./
RUN npm install && mkdir /fifteen-puzzle && mv ./node_modules ./fifteen-puzzle

WORKDIR /fifteen-puzzle

COPY . .

RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=builder /fifteen-puzzle/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
