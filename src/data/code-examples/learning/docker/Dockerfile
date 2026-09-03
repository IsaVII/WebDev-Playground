# ---- Stage 1: build the React app ----
FROM node:20-alpine AS build
WORKDIR /app

# Copy only the dependency manifests first - Docker caches each layer,
# so this layer (and npm ci below) is skipped on rebuilds unless
# package.json/package-lock.json actually changed
COPY package.json package-lock.json ./
RUN npm ci

# Now bring in the rest of the source and build the production bundle
COPY . .
RUN npm run build

# ---- Stage 2: serve the built files with nginx ----
FROM nginx:1.27-alpine AS runtime

# Custom config so client-side routes (React Router) don't 404 on refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy ONLY the compiled output from the build stage - node_modules,
# source files, and the whole Node toolchain never reach this image
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Run nginx in the foreground so it is PID 1 and receives SIGTERM directly
CMD ["nginx", "-g", "daemon off;"]
