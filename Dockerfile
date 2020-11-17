# build environment
FROM node:8.10.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm config set proxy http://172.30.221.21:80
RUN npm install --silent
RUN npm install react-scripts@3.2.0 -g --silent
COPY . /usr/src/app

#sed  configuration
RUN mv /usr/src/app/.env.prod  /usr/src/app/.env


RUN npm run build

# production environment
FROM nginx:1.15.9-alpine
COPY --from=builder /usr/src/app/nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /usr/src/app/nginx/nginx-selfsigned.key /etc/nginx/nginx-selfsigned.key
COPY --from=builder /usr/src/app/nginx/nginx-selfsigned.crt /etc/nginx/nginx-selfsigned.crt
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
