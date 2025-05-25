FROM node:current-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

# ENV PORT=${PORT}
# ENV AUTH_SECRET=${AUTH_SECRET}
# ENV HTTP_PROTOCOL=${HTTP_PROTOCOL}
# ENV WEBSOCKET_PROTOCOL=${WEBSOCKET_PROTOCOL}
# ENV BACKEND_URI=${BACKEND_URI}
# ENV ENVIRONMENT=${ENVIRONMENT}
# ENV ORIGIN=${ORIGIN}
# ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
# ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}}
# ENV AUTH_AUTH0_ID=${AUTH_AUTH0_ID}}
# ENV AUTH_AUTH0_SECRET="AfgFTG1OqBCP_6DmekECci0QIJLrBCTFuq5TktDinmNUCJAZ6SDWO5Jjdpao4nxX"
# ENV AUTH_AUTH0_ISSUER="https://thnt.eu.auth0.com"

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
CMD [ "node", "-r", "dotenv/config", "build" ]