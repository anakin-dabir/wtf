FROM node:lts as server-build
WORKDIR /usr/src/server
COPY server/package.json server/.env* ./
RUN npm install
COPY server ./
RUN npm run build

# Stage 2: Build the client
FROM node:lts as client-build
WORKDIR /usr/src/client
COPY client/package.json client/.env* ./
RUN npm install
COPY client ./
RUN npm run build

# Stage 3: Final image
FROM node:lts
WORKDIR /app
COPY --from=server-build /usr/src/server/dist ./server
COPY --from=client-build /usr/src/client/build ./client/build
COPY .env* ./
EXPOSE 3000
CMD ["node", "./server/server.js"]