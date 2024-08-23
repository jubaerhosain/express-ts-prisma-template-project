# Base image
FROM node:21-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn install

# Copy project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS application
RUN yarn run build

# Expose port
EXPOSE 3000

# Start NestJS application
CMD ["yarn", "run", "start:prod"]