ARG DEPENDENCIES_TAG

FROM atr.scalping.deps:$DEPENDENCIES_TAG as compiled

COPY . .

RUN rm -rf dist

RUN npm run build

#RUN rm -rf packages shared node_modules

ENTRYPOINT ["doppler", "run", "--"]
#CMD ["node", "--enable-source-maps", "/atr/dist/packages/backend/apps/ms-scalping/check.nats.js"]
CMD ["node", "--enable-source-maps", "/atr/dist/packages/backend/apps/ms-scalping/check.nats.js"]

EXPOSE 9200
