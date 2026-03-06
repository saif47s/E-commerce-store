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
RUN npm ci --include=dev --prefer-offline --no-audit --no-fund --legacy-peer-deps

# Copy project files
COPY . .

# Build the project
RUN DISABLE_MEDUSA_ADMIN=false npm run build

# Align Admin build directory with Medusa runtime expectations
RUN mkdir -p public && cp -r .medusa/server/public/* public/

# Expose the port Hugging Face Spaces expects
EXPOSE 7860

# Start command - Run migrations then start the server
CMD ["sh", "-c", "npx medusa db:migrate && PORT=7860 npm run start"]
