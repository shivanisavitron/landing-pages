# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Vite inlines VITE_* env vars into the static bundle at build time, so this
# must be passed as a build arg — setting it at container runtime would do
# nothing, since by then the JS is already built.
ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
