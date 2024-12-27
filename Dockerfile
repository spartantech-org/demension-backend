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
