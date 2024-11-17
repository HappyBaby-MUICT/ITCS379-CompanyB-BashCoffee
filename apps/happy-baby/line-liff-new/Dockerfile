FROM node:18-alpine AS base
ENV PNPM_HOME=/usr/bin

RUN npm i -g pnpm

FROM base AS init
WORKDIR /app

COPY . .
RUN pnpm add -g turbo@1.13.4
RUN turbo prune --scope=@chunimai/admin-client --docker

FROM base AS installer
WORKDIR /app

COPY --from=init /app/out/json ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1

COPY --from=installer /app ./
COPY --from=init /app/out/full ./
COPY ./.env ./apps/client/admin/.env
RUN pnpm turbo run build --filter=@chunimai/admin-client
RUN rm -rf ./node_modules

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 client

USER root

RUN mkdir -p /app/apps/client/admin/.next/cache
RUN chown -R client:nodejs /app/apps/client/admin/.next/cache

USER client

COPY --from=builder /app/apps/client/admin/.next/standalone ./
COPY --from=builder /app/apps/client/admin/.next/static ./apps/client/admin/.next/static
COPY --from=builder /app/apps/client/admin/public ./apps/client/admin/public

EXPOSE 3000
CMD ["node", "./apps/client/admin/server.js"]
