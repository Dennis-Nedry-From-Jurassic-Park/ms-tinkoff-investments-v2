ARG CORE_TAG

FROM core-js:$CORE_TAG as deps

COPY package.json pnpm-*.yaml /atr/
COPY packages/backend/package.json /atr/packages/backend/package.json

RUN set -ex; \
    pnpm -r install --frozen-lockfile --recursive --prod;
