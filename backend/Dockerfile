FROM ubuntu

# Create app directory
WORKDIR /usr/nodeapp

# Copy package.json and lockfile
COPY ./package*.json ./
COPY ./pnpm-lock.yaml ./

# Install curl and Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Command to start the app
CMD ["pnpm", "run", "start"]
