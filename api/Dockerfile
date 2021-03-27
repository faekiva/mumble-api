from node:15
workdir usr/src/app
COPY package*.json ./
RUN npm ci --only=production && \
    npm install -g typescript
COPY . .
RUN tsc
EXPOSE 4815
CMD ["node", "dist/main.js"]