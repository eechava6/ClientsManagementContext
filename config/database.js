//Set up mongoose connection and db config

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env =  process.env.NODE_ENV || 'dev';   

var config = {
  dev: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'clientBD'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/clientsQueries'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'clientBD'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/clientBD'
  },

  prod: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'clientBD'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/clientsQueries'
  }
};

module.exports = config[env];