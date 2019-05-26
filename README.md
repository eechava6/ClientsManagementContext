<<<<<<< HEAD




# Proyecto 1 - Tópicos especiales en Telemática.

Aplicación de registro de posición (tracking-gps) en tiempo real (tipo IoT) utilizando *NodeJs conjunto a express* y las mejores prácticas DevOps para integración y entrega continua.

By: Esteban Echavarría - eechava6@eafit.edu.co

# 1. Analisis y Diseño

* [Análisis y Diseño](analisis-diseno.md)


# Requirements for development environment:

* Node 
* NPM
* MongoDB

# Steps to test the project in Development environment:

* Clone the project in your local machine.

`git clone https://github.com/eechava6/Geolocation`

* Install the dependencies in the package.json (You have to be in the folder were package.json resides) with the following command: 

`NPM install`

* Install cross-env globaly

`NPM install -g cross-env`

* Run Mongo as daemon 

`mongod --config {path-to-conf} `

(By default path-to-conf is /usr/local/etc/mongod.conf in Unix) 

* Run the app with the development command.

`npm run dev`



=======

# MicroservicioClientes
A través de esto repositorio se hará un CRUD de clientes, además de diferentes operaciones propias del dominio. 
>>>>>>> 84d3a6a6d140cd623544f120bab458855d864a63
