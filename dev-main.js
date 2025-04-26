// dev-main.js
require('ts-node').register({
  transpileOnly: true,
  project: require('path').join(__dirname, 'tsconfig.json')
});

// load tray first:
require('./src/tray');

module.exports = require('./src/main.ts');