from node:12
workdir usr/src/app
COPY package*.json ./
RUN npm ci --only=production \
    tsc
COPY . .
CMD ["node", "dist/main.js"]