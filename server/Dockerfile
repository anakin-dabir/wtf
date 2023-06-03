
FROM node:20.2

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start server
CMD ["npm", "start"]
