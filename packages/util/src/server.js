const util = require('packages/util/src/lib/etc.js');
const settings = require('./lib/settings/server.js');
const logger = require('./lib/logger.js');

module.exports = {
    logger,
    ...settings,
    ...util,
};
