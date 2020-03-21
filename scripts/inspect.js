const util = require('util');

const config = require('../webpack.config.js');

console.log(process.env.NODE_ENV);
// console.log(JSON.stringify(config, null, 2));
console.log(util.inspect(config, {
  depth: null,
}));
