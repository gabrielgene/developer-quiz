const request = require('supertest');
const nock = require('nock');
const app = require('../../app');
const filterHeaders = require('../filterHeaders');

it('should filter header properly', async () => {
  nock('http://pokeapi.co/api/v2')
    .defaultReplyHeaders({
      'secret-header': 'secret',
    })
    .get('/pokemon/1')
    .reply(200, { value: true });

  const testConfig = {
    upstream: {
      pokeapi: 'http://pokeapi.co/api/v2',
      default: 'http://pokeapi.co/api/v2',
    },
    beforeRequestPlugins: [],
    afterRequestPlugins: [filterHeaders(['secret-header'])],
  };

  const response = await request(app(testConfig)).get('/pokemon/1');
  expect(response.headers).not.toHaveProperty('secret-header');
  expect(response.body).toEqual({ value: true });
});
