<<<<<<< HEAD
# demension-backend
=======
# Dimension-ERP with Docker and Yarn

## Overview
This project sets up the Dimension-ERP application using Docker and Yarn for seamless development and deployment. The application is configured to connect to a MongoDB database.

## Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (if running locally without Docker)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Environment Variables
Create a `.env` file in the project root with the following content:

```env
PORT=3000
MONGODB_URL="mongodb://localhost:27017/pos"
DEFAULT_SOCIAL_PASSWORD="w6ohXfbg85"
FIREBASE_STORAGE_BUCKET="fpos-66e6c.appspot.com"
NODE_ENV=development
```

## Project Structure
### `docker-compose.yml`
```yaml
services:
  dimension-erp:
    build: .
    ports:
      - "3001:3000"
    volumes:
      - .:/usr/src/app
      - .env:/usr/src/app/.env
    command: bash -c "yarn install && yarn start"
    container_name: dimension
    environment:
      - NODE_ENV=development
    networks:
      - my-custom-network

networks:
  my-custom-network:
    external: true
```

### `Dockerfile`
```dockerfile
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files first
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application using Yarn
CMD ["yarn", "start"]
```

## Setup and Usage

### 1. Build and Run with Docker
#### Step 1: Build the Application
Run the following command to build the Docker image:
```bash
docker-compose build
```

#### Step 2: Start the Application
Start the application using:
```bash
docker-compose up
```

#### Step 3: Access the Application
The application will be accessible at [http://localhost:3001](http://localhost:3001).

### 2. Verify MongoDB Connection
Ensure the MongoDB container is running separately and accessible. If needed, connect it to the same Docker network:
```bash
docker network connect my-custom-network mongodb
```

### 3. Install Dependencies Locally
If you prefer running the application locally without Docker:
```bash
yarn install
```

### 4. Start the Application Locally
Run the following command:
```bash
yarn start
```

MongoDB URL Configuration

When running the application using yarn start locally, ensure the MONGODB_URL is set to:

MONGODB_URL="mongodb://localhost:27017/pos"

When running the application inside Docker, set the MONGODB_URL to:

MONGODB_URL="mongodb://mongodb:27017/pos"

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Notes
- Ensure that the MongoDB instance is accessible at `mongodb://localhost:27017/pos` or update the `MONGODB_URL` environment variable accordingly.
- Customize the Docker network name (`my-custom-network`) if needed to match your setup.

## Troubleshooting
### Common Issues
#### “MongooseServerSelectionError”
Ensure MongoDB is running and reachable from the application container. You can verify this by:
1. Checking MongoDB logs:
   ```bash
   docker logs mongodb
   ```
2. Inspecting the MongoDB container's IP:
   ```bash
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb
   ```

### Restart the Containers
If you face issues, restart the containers:
```bash
docker-compose down && docker-compose up --build
```

>>>>>>> 5d0cd9b (Update README with yarn, Docker, and MongoDB configuration details)
