# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.7.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV development

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# --- SUPPRIMEZ ou COMMENTEZ cette ligne pour le dev ---
# USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev