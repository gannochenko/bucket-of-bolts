const settings = require('./lib/settings/client.js');

const util = require('packages/util/src/lib/etc.js');

module.exports = { ...settings,
  ...util
};