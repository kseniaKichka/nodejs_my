FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
