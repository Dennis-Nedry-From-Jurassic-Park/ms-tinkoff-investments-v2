ARG CORE_TAG

FROM core-js:$CORE_TAG as deps

WORKDIR /atr/

ENV GENERATE_SOURCEMAP=false

COPY package.json tsconfig.json lage.config.js pnpm-*.yaml ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY shared/lib-msg-queue/package.json ./shared/lib-msg-queue/package.json
COPY shared/lib-msg-queue/tsconfig.json ./shared/lib-msg-queue/tsconfig.json
COPY shared/ms-base/package.json ./shared/ms-base/package.json
COPY shared/ms-base/tsconfig.json ./shared/ms-base/tsconfig.json
COPY shared/package.json ./shared/package.json
COPY shared/tsconfig.json ./shared/tsconfig.json

RUN set -ex; \
    pnpm -r install --frozen-lockfile --recursive --prod; \
# NODE_OPTIONS="--max-old-space-size=4096"
