FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200
CMD [ "npm", "start" ]
