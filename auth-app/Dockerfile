# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Install required modules for path resolution
RUN npm install tsconfig-paths ts-node

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "-r", "tsconfig-paths/register", "-r", "ts-node/register", "dist/app.js"]