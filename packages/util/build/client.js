const settings = require('./lib/settings/client.js');

const util = require('packages/util/src/etc.js');

module.exports = { ...settings,
  ...util
};
