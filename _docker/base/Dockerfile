FROM --platform=linux/amd64 node:18-alpine AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add \
  python3 \
  build-base \
  && ln -sf /usr/bin/python3 /usr/bin/python

WORKDIR /app
COPY ./dist/package.json ./
RUN yarn install --prod
RUN yarn add sharp --prod

FROM base AS runner
WORKDIR /
ENV NODE_ENV=production
ENV NPM_CONFIG_PREFIX=/node_modules
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=deps /app/package.json ./package.json

USER node

EXPOSE 80

ENV PORT 80

CMD ["npm", "start"]
