ARG CORE_TAG

#ENV GENERATE_SOURCEMAP=false

FROM core-slim-js:$CORE_TAG as deps

COPY package.json tsconfig.json lage.config.js pnpm-*.yaml /atr/
COPY packages/backend/package.json /atr/packages/backend/package.json

RUN pnpm fetch --frozen-lockfile
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm -r install --recursive --frozen-lockfile

RUN set -ex; \
    pnpm -r install --frozen-lockfile --recursive;
