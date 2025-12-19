FROM nginx:stable-alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to Nginx web root
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy site contents
COPY . .

EXPOSE 5000

# Basic healthcheck: ensures Nginx is responding
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:5000/health || exit 1

