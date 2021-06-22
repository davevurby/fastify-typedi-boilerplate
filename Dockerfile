FROM node:16-alpine As development

# update packages, to reduce risk of vulnerabilities
RUN apk update && apk upgrade

# set a non privileged user to use when running this image
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn

COPY --chown=nodejs:nodejs package*.json ./

RUN npm install && npm audit fix && npm cache clean --force

COPY --chown=nodejs:nodejs . .

RUN npm run build

FROM node:16-alpine as production

# update packages, to reduce risk of vulnerabilities
RUN apk update && apk upgrade

# set a non privileged user to use when running this image
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NPM_CONFIG_LOGLEVEL=warn

COPY --chown=nodejs:nodejs package*.json ./

RUN npm install && npm audit fix && npm cache clean --force

COPY --chown=nodejs:nodejs --from=development /home/nodejs/app/dist ./dist

CMD ["node", "dist/main"]
