const request = require('supertest');
const nock = require('nock');
const app = require('../../app');
const logger = require('../logger');

it('should log request properly', async () => {
  Date.now = jest.fn(() => 1487076708000); // 2017-02-14
  nock('http://pokeapi.co/api/v2')
    .get('/pokemon/1')
    .reply(200, { success: true });
  const logFunction = jest.fn();

  const testConfig = {
    upstream: {
      pokeapi: 'http://pokeapi.co/api/v2',
      default: 'http://pokeapi.co/api/v2',
    },
    beforeRequestPlugins: [logger(logFunction)],
    afterRequestPlugins: [],
  };

  await request(app(testConfig)).get('/pokemon/1');
  expect(logFunction).toHaveBeenCalledWith(
    '[2017-02-14T12:51:48.000Z] - GET - /pokemon/1'
  );
});

// test with other method
