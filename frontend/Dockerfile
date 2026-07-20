FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* /app/
RUN npm install

# Copy application files
COPY . /app/

# Expose Vite dev server port
EXPOSE 5173

# Start development server binding to all interfaces
CMD ["npm", "run", "dev", "--", "--host"]
