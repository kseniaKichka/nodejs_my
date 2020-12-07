#FROM node:10
#RUN mkdir -p /usr/src/app
#
#COPY package.json /usr/src/app/package.json
#RUN ls -al
#
#WORKDIR /usr/scr/app
#RUN ls -al
#RUN npm install -g nodemon
#RUN npm install
#COPY . /usr/src/app/
#RUN ls -al
#EXPOSE 3001
#
#CMD ["npm", "start"]

FROM node:12-alpine
WORKDIR /app
COPY . /app
COPY package.json /app/package.json
RUN npm install -g nodemon
RUN npm install
EXPOSE 3001

CMD ["npm", "start"]
