# Use an official Node.js runtime as the base image
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY ["package.json", "package-lock.json*", "./"]

# Install all dependencies (including dev dependencies)
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# ✅ Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Remove dev dependencies to keep the image lightweight
RUN npm prune --production

# --------------------------------------------
# Create a lightweight production image
# --------------------------------------------
FROM node:lts-alpine

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Change ownership and switch to non-root user
RUN chown -R node /usr/src/app
USER node

# Expose the port the server runs on
EXPOSE 3000

# Command to start the server
CMD ["node", "dist/index.js"]
