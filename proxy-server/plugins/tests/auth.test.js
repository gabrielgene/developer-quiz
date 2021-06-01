const jwt = require('jsonwebtoken');
const request = require('supertest');
const nock = require('nock');
const app = require('../../app');
const auth = require('../auth');

it('should handle auth properly', async () => {
  nock('http://pokeapi.co/api/v2')
    .get('/pokemon/1')
    .reply(200, { success: true });

  const SECRET = 'test@00';
  const testConfig = {
    upstream: {
      pokeapi: 'http://pokeapi.co/api/v2',
      default: 'http://pokeapi.co/api/v2',
    },
    beforeRequestPlugins: [auth(SECRET)],
    afterRequestPlugins: [],
  };

  const authToken = jwt.sign({ testToken: true }, SECRET, {
    expiresIn: '1000d',
  });

  const response = await request(app(testConfig))
    .get('/pokemon/1')
    .set({ Authorization: authToken });

  expect(response.headers.authorization).toBe(authToken);
  expect(response.body).toEqual({ success: true });
});

it('should handle error without auth', async () => {
  nock('http://pokeapi.co/api/v2')
    .get('/pokemon/1')
    .reply(200, { success: true });

  const SECRET = 'test@00';
  const testConfig = {
    upstream: {
      pokeapi: 'http://pokeapi.co/api/v2',
      default: 'http://pokeapi.co/api/v2',
    },
    beforeRequestPlugins: [auth(SECRET)],
    afterRequestPlugins: [],
  };

  const response = await request(app(testConfig)).get('/pokemon/1');

  expect(response.text).toBe('Unauthorized');
  expect(response.status).toBe(401);
});

it('should handle wrong auth', async () => {
  nock('http://pokeapi.co/api/v2')
    .get('/pokemon/1')
    .reply(200, { success: true });

  const SECRET = 'test@00';
  const testConfig = {
    upstream: {
      pokeapi: 'http://pokeapi.co/api/v2',
      default: 'http://pokeapi.co/api/v2',
    },
    beforeRequestPlugins: [auth(SECRET)],
    afterRequestPlugins: [],
  };

  const response = await request(app(testConfig))
    .get('/pokemon/1')
    .set({ Authorization: '1234' });

  expect(response.status).toBe(401);
});
