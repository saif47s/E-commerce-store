# Base image - Alpine for smaller footprint
FROM node:20-alpine

# Install system dependencies for Medusa
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with memory optimization
# --no-audit and --no-fund save memory and time
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy project files
COPY . .

# Build the project with strict memory limits to prevent OOM
RUN NODE_OPTIONS=--max-old-space-size=200 npm run build

# Expose the port Hugging Face Spaces expects
EXPOSE 7860

# Start command - Run migrations then start the server
CMD ["sh", "-c", "npx medusa db:migrate && PORT=7860 npm run start"]
