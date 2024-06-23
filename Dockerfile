FROM node:16
WORKDIR /app

RUN npm install -g npm@8.12.1

COPY ./webapp/package*.json ./
RUN npm install

COPY . .
#RUN npm run build

EXPOSE 8080

CMD ["cd", "webapp"]
CMD [ "npm", "run", "dev", "--", "--host", "--port", "8080" ]
