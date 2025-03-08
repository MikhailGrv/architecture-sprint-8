# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app

# Expose port
EXPOSE 8090

# Запускаем приложение
CMD ["node", "index.js"]