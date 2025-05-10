FROM node:current-alpine AS builder
WORKDIR /app
ENV PORT=5173
ENV NODE_ENV=production
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
EXPOSE 5173
CMD [ "npm", "run", "build" ]