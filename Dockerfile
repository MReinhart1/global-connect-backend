FROM --platform=linux/amd64 node:20

WORKDIR /app

COPY bin bin
COPY cloudResources cloudResources
COPY routes routes
COPY schemas schemas
COPY *.js .
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

CMD [ "npm", "run", "start" ]

EXPOSE 3000
