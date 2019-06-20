FROM node:9.6.1

LABEL version="1.0"
LABEL description="Clientes"
LABEL maintainer="Jorge - Camilo - Esteban"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /clientes
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD ["sh", "-c", "npm run prod "]


