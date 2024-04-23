
FROM node:18-alpine AS base

RUN apk add --no-cache curl
FROM base AS builder


WORKDIR /app


COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm install
RUN mkdir -p ./next
COPY . .

ARG NEXT_PUBLIC_DB_HOST

ENV NEXT_PUBLIC_DB_HOST=$NEXT_PUBLIC_DB_HOST
# RUN npm run build

# Expose port 3000 to the outside world
# EXPOSE 3000

# Start the application


# CMD ["npm", "run", "start", "--", "--port", "3001"]
