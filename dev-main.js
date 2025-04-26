// dev-main.js
require('ts-node').register({
    transpileOnly: true,
    project: require('path').join(__dirname, 'tsconfig.json')
  });
  // Now load your TS main
  module.exports = require('./src/main.ts');
  