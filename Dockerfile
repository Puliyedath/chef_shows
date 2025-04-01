FROM node:20-alpine AS base 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

# Initialize the prisma client => creates a generated folder in 
RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "run", "dev"]

