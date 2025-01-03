# FROM ubuntu

# # Create app directory
# WORKDIR /usr/nodeapp

# # Copy package.json and lockfile
# COPY ./package*.json ./
# COPY ./pnpm-lock.yaml ./

# # Install curl and Node.js
# RUN apt-get update && apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get install -y nodejs

# # Install pnpm globally
# RUN npm install -g pnpm

# # Install dependencies using pnpm
# RUN pnpm install

# # Copy the rest of the app
# COPY . .

# # Build the TypeScript code
# RUN pnpm run build

# # Command to start the app
# CMD ["pnpm", "run", "start"]


FROM ubuntu

# Create app directory
WORKDIR /usr/nodeapp

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release

# Add Docker’s official GPG key:
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker CLI
RUN apt-get update && apt-get install -y docker-ce-cli

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY ./package*.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the app
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Command to start the app
CMD ["pnpm", "run", "start"]
