FROM node:14 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM pierrezemb/gostatic AS deployment

COPY --from=builder /app/dist /srv/http
EXPOSE 8043

CMD ["-enable-health", "-enable-logging"]