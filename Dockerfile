FROM node:20-slim AS base

# Install OpenSSL, Python3, make, and g++ required by Prisma and native modules like better-sqlite3
RUN apt-get update && apt-get install -y openssl python3 make g++ sqlite3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and Prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies cleanly
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client and sync DB
RUN npx prisma generate
RUN npx prisma db push

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production environment settings
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
