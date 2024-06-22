FROM node:20.14.0-alpine
WORKDIR /opt/nest_store
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]