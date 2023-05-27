FROM node:18-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./
RUN pnpm build

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

CMD ["pnpm", "start"]
