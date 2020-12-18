FROM node:10-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "run" ]