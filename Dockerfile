FROM node:21-alpine
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of source code
COPY . .

# Build Next.js application
RUN npm run build
EXPOSE 3000
# The command to run
CMD ["npm", "run", "next"]
