
# Docker Setup for DOH Frontend

This document explains how to run the DOH Frontend application using Docker.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Development Mode

To run the application in development mode with hot reload:

```bash
# Build and run development environment
docker-compose --profile dev up --build

# Or run in background
docker-compose --profile dev up --build -d
```

The application will be available at `http://localhost:3000`

### Production Mode

To run the application in production mode:

```bash
# Build and run production environment
docker-compose --profile prod up --build

# Or run in background
docker-compose --profile prod up --build -d
```

The application will be available at `http://localhost:3000`

### Production with Nginx

To run the application with Nginx reverse proxy:

```bash
# Build and run production environment with Nginx
docker-compose --profile prod --profile nginx up --build

# Or run in background
docker-compose --profile prod --profile nginx up --build -d
```

The application will be available at `http://localhost:80` (through Nginx)

## Docker Commands

### Build the image

```bash
# Build development image
docker build --target builder -t doh-frontend:dev .

# Build production image
docker build --target runner -t doh-frontend:prod .
```

### Run containers

```bash
# Run development container
docker run -p 3000:3000 -v $(pwd):/app doh-frontend:dev npm run dev

# Run production container
docker run -p 3000:3000 doh-frontend:prod
```

### Stop and clean up

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all
```

## Environment Variables

You can set environment variables by creating a `.env` file in the root directory:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add other environment variables as needed
```

## Troubleshooting

### Port already in use

If port 3000 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change 3001 to any available port
```

### Build issues

If you encounter build issues:

1. Clean Docker cache:
   ```bash
   docker system prune -a
   ```

2. Rebuild without cache:
   ```bash
   docker-compose build --no-cache
   ```

### Permission issues

If you encounter permission issues on Linux/Mac:

```bash
# Fix ownership of node_modules
sudo chown -R $USER:$USER node_modules
```

## File Structure

```
.
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf             # Nginx configuration (optional)
├── .dockerignore          # Files to exclude from Docker build
└── DOCKER_README.md       # This file
```

## Performance Optimization

The Dockerfile uses multi-stage builds to optimize image size:

1. **deps stage**: Installs production dependencies only
2. **builder stage**: Builds the Next.js application
3. **runner stage**: Creates the final production image with only necessary files

The production image uses Next.js standalone output for better performance and smaller size. 