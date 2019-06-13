const commonConfig = require('./defConf');

module.exports = {
    repository: {
        type: 'mongodb',
        host: 'localhost',                          // optional
        port: 27017,                                // optional
        dbName: 'readmodel',                        // optional
        timeout: 10000                              // optional
    }
}