
FROM node:20.2

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Expose port 5173
EXPOSE 5173

# Start server
CMD ["npm", "start"]
