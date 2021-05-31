const logger = require('./plugins/logger');

const config = {
  port: 3000,
  upstream: {
    pokeapi: 'http://pokeapi.co/api/v2',
    default: 'http://pokeapi.co/api/v2',
    hookbin: 'https://hookb.in/3OZj819xd0HEwwjBl0za',
  },
  beforeRequestPlugins: [logger(console.log)],
  afterRequestPlugins: [],
};

module.exports = config;
