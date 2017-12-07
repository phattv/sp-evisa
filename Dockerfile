FROM node:alpine

# Create app directory
RUN mkdir -p usr/src/evisavn
WORKDIR usr/src/evisavn

# Install app dependencies
COPY package.json /usr/src/evisavn
COPY yarn.lock /usr/src/evisavn
RUN yarn

# Bundle app source
COPY . /usr/src/evisavn
RUN yarn export

EXPOSE 3000

CMD [ "node", "server.js" ]
