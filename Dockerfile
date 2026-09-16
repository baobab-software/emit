# -----------------------------------------------------
# Base
# -----------------------------------------------------
FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable


# -----------------------------------------------------
# Dependencies
# -----------------------------------------------------
FROM base AS dependencies

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


# -----------------------------------------------------
# Development
# -----------------------------------------------------
FROM base AS development

ENV NODE_ENV=development

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]


# -----------------------------------------------------
# Build
# -----------------------------------------------------
FROM base AS build

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn build


# -----------------------------------------------------
# Production
# -----------------------------------------------------
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=true \
    && yarn cache clean

COPY --from=build /app/dist ./dist

EXPOSE 3000

USER node

CMD ["node", "dist/main.js"]