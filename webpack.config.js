/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { paths } = require('react-app-rewired');
// require normalized overrides
const overrides = require('react-app-rewired/config-overrides');

const config = require(`${paths.scriptVersion}/config/webpack.config.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`);

module.exports = overrides.webpack(config, process.env.NODE_ENV);
