FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node . .

RUN npm ci

ENV DEBUG=playground:*

CMD npm start


#FROM node:16

#WORKDIR /usr/src/app

#COPY . .

#RUN npm ci

#CMD ["npm", "run", "dev"]