FROM node:current-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:current-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
ENV NODE_ENV=production
EXPOSE 5173
ENV PORT=5173
CMD [ "node", "build" ]