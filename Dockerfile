FROM node:current-alpine

RUN apk add --no-cache gzip

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN node --run build
RUN gzip -rk public dist/browser

CMD ["node","--run","start"]