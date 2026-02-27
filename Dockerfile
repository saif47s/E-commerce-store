# Base image - Alpine for smaller footprint
FROM node:20-alpine

# Install system dependencies for Medusa
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Set root working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Change working directory to the subfolder where Medusa is located
WORKDIR /app/my-Saif-store

# Install dependencies with memory optimization
RUN npm ci --prefer-offline --no-audit --no-fund

# Skip the memory-heavy Admin UI build by setting NODE_ENV=production
RUN NODE_ENV=production NODE_OPTIONS=--max-old-space-size=8192 npm run build

# Expose the port Hugging Face Spaces expects
EXPOSE 7860

# Start command - Run migrations then start the server
CMD ["sh", "-c", "npx medusa db:migrate && PORT=7860 npm run start"]
