FROM node:21-alpine
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js application
RUN npm run build

# The command to run your application
CMD ["npm", "start"]
