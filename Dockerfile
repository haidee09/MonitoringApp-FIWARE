# Create image based on the official Node 8 image from dockerhub
FROM node:8

# Create a directory where our app will be placed
RUN mkdir -p /monitoringappfiware

# Change directory so that our commands run inside this new directory
WORKDIR /monitoringappfiware

# Copy dependency definitions
COPY package.json /monitoringappfiware

# Install dependecies
RUN npm install express
RUN npm install path
RUN npm install http

# Get all the code needed to run the app
COPY /dist /monitoringappfiware
COPY server.js /monitoringappfiware

# Expose the port the app runs in
EXPOSE 3500

# Serve the app
CMD ["node", "server.js"]
