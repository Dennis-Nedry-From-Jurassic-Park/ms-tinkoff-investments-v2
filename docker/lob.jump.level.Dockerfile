ARG DEPENDENCIES_TAG

FROM atr.scalping.deps:$DEPENDENCIES_TAG as compiled

COPY . .

RUN rm -rf dist && \
    pnpm run build

#RUN rm -rf packages shared node_modules

#FROM compiled as run
#COPY --chown=node:node --from=compiled /atr/dist/ ./dist/
#COPY --chown=node:node --from=compiled /atr/node_modules/ ./node_modules/
#WORKDIR /atr/
#ENTRYPOINT ["doppler", "run", "--"]
#ENTRYPOINT ["node", "--enable-source-maps", "--experimental-modules", "/atr/dist/packages/backend/apps/ms-scalping/check.nats.js"]

ENTRYPOINT ["node"]
CMD ["--enable-source-maps", "--experimental-modules", "dist/packages/backend/apps/ms-scalping/check.nats.js"]

EXPOSE 8080
