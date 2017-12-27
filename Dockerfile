# Create image based on the official Node 8 image from dockerhub
FROM mhart/alpine-node:8

# Create a directory where our app will be placed
RUN mkdir -p /appwebfiware

# Change directory so that our commands run inside this new directory
WORKDIR /appwebfiware

# Copy dependency definitions
COPY package.json /appwebfiware

# Install dependecies
RUN npm i
RUN npm install express
RUN npm install path
RUN npm install http

# Get all the code needed to run the app
COPY ./ /appwebfiware
COPY server.js /appwebfiware

# Expose the port the app runs in
EXPOSE 3500

# Serve the app
CMD ["node", "server.js"]
