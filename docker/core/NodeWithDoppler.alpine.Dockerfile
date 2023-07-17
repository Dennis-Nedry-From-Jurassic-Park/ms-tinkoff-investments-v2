FROM node:lts-alpine

RUN apk --no-cache add curl --repository=https://dl-cdn.alpinelinux.org/alpine/v3.16/main
RUN apk --no-cache add wget

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub
RUN echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories
RUN apk add doppler

RUN corepack enable && corepack prepare pnpm@8.6.7 --activate
