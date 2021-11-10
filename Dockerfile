FROM node:12

# Create app directory
WORKDIR /app

COPY . .
EXPOSE 3000
RUN yarn


CMD [ "yarn", "start" ]
