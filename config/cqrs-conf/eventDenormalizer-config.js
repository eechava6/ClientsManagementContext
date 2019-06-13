const commonConfig = require('./eventStore-conf');

module.exports = {
    repository: {
        type: 'mongodb',
        host: 'localhost',                          // optional
        port: 27017,                                // optional
        dbName: 'readmodel',                        // optional
        timeout: 10000                              // optional
    },
    revisionGuardStore: {
        queueTimeout: 1000,                         // optional, timeout for non-handled events in the internal in-memory queue
        queueTimeoutMaxLoops: 3,                     // optional, maximal loop count for non-handled event in the internal in-memory queue

        type: 'redis',
        host: 'localhost',                          // optional
        port: 6379,                                 // optional
        db: 0,                                      // optional
        prefix: 'readmodel_revision',               // optional
        timeout: 10000,                              // optional
        password: 'ztEB@DSWP^3P5Zt'                 // optional
    },
    eventDefinition : commonConfig.eventDefinition
}