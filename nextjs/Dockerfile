
FROM node:18-alpine AS base

RUN apk add --no-cache curl
FROM base AS builder


WORKDIR /app


COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm install
RUN mkdir -p ./next
COPY . .

#ARG DB_HOST

#ENV NEXT_PUBLIC_DB_HOST=$DB_HOST
#RUN npm run build

# Expose port 3000 to the outside world
# EXPOSE 3000

# Start the application
#CMD ["npm", "run", "build", "&&", "npm", "start"]

