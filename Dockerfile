FROM node:alpine

# Create app directory
RUN mkdir -p usr/src/evisa
WORKDIR usr/src/evisa

# Install app dependencies
COPY package.json /usr/src/evisa
COPY yarn.lock /usr/src/evisa
RUN yarn

# Bundle app source
COPY . /usr/src/evisa
RUN yarn export

CMD [ "node", "server.js" ]
