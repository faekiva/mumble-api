from node:12
workdir usr/src/app
COPY package*.json ./
RUN npm ci --only=production && \
    npm install -g typescript
COPY . .
RUN tsc
CMD ["node", "dist/main.js"]