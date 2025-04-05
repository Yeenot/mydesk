# Dockerfile.dev
FROM node:20

WORKDIR /app

# Install global Angular CLI (for ng serve)
RUN npm install -g @angular/cli

# Copy package files and install deps
COPY package*.json ./

# Copy project files
COPY . .