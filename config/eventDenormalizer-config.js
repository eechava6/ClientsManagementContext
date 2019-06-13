const commonConfig = require('./common-config');

module.exports = {
    repository: {
        type: 'mongodb',
        host: 'localhost',                          // optional
        port: 27017,                                // optional
        dbName: 'readmodel',                        // optional
        timeout: 10000                              // optional
      // authSource: 'authedicationDatabase',        // optional
        // username: 'technicalDbUser',                // optional
        // password: 'secret'                          // optional
    }
}