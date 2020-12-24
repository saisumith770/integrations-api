FROM node:12
WORKDIR /integrations-api
COPY package*.json ./
RUN npm install
RUN npx prisma init
RUN npx prisma introspect
RUN npx prisma generate
#RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["node","./src-js/api/api.service.js"]