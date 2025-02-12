# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the environment to production
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install only production dependencies silently
RUN npm install --production --silent && mv node_modules ../

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Change ownership and switch to non-root user
RUN chown -R node /usr/src/app
USER node

# Expose the port the server runs on
EXPOSE 3000

# Command to start the server
CMD ["node", "dist/index.js"]
