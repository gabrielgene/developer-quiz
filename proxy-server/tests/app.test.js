const request = require('supertest');
const nock = require('nock');
const app = require('../app');

const testConfig = {
  upstream: {
    pokeapi: 'http://pokeapi.co/api/v2',
    default: 'http://pokeapi.co/api/v2',
    hookbin: 'https://hookb.in/3OZj819xd0HEwwjBl0za',
  },
  beforeRequestPlugins: [],
  afterRequestPlugins: [],
};

it('should proxy to hookbin', async () => {
  nock('https://hookb.in/3OZj819xd0HEwwjBl0za')
    .defaultReplyHeaders({
      'test-header': 'works',
      'Content-Type': 'application/json',
    })
    .get('/')
    .reply(200, { success: true });

  const response = await request(app(testConfig)).get('/hookbin');
  expect(response.header['test-header']).toBe('works');
  expect(response.body).toEqual({ success: true });
});

it('should proxy to hookbin with html return', async () => {
  nock('https://hookb.in/3OZj819xd0HEwwjBl0za')
    .defaultReplyHeaders({
      'test-header': 'works',
      'Content-Type': 'text/html',
    })
    .get('/')
    .reply(200, '<h1>Test</h1>');

  const response = await request(app(testConfig)).get('/hookbin');
  expect(response.header['test-header']).toBe('works');
  expect(response.text).toBe('<h1>Test</h1>');
});

it('should handle error', async () => {
  nock('https://hookb.in/3OZj819xd0HEwwjBl0za')
    .defaultReplyHeaders({
      'test-header': 'error',
      'Content-Type': 'application/json',
    })
    .get('/error-path')
    .reply(500, { error: true });

  const response = await request(app(testConfig)).get('/hookbin/error-path');
  expect(response.header['test-header']).toBe('error');
  expect(response.body).toEqual({ error: true });
});

it('should handle default route', async () => {
  nock('http://pokeapi.co/api/v2')
    .defaultReplyHeaders({
      'test-header': 'pokemon',
      'Content-Type': 'application/json',
    })
    .get('/')
    .reply(200, { success: true });

  const response = await request(app(testConfig)).get('/');
  expect(response.header['test-header']).toBe('pokemon');
  expect(response.body).toEqual({ success: true });
});

it('should handle default route with params', async () => {
  nock('http://pokeapi.co/api/v2')
    .defaultReplyHeaders({
      'test-header': 'pokemon-1',
      'Content-Type': 'application/json',
    })
    .get('/pokemon/1')
    .reply(200, { name: 'bulbasaur' });

  const response = await request(app(testConfig)).get('/pokemon/1');
  expect(response.header['test-header']).toBe('pokemon-1');
  expect(response.body).toEqual({ name: 'bulbasaur' });
});

it('should handle default route with query', async () => {
  nock('http://pokeapi.co/api/v2')
    .defaultReplyHeaders({
      'test-header': 'pokemon-query-header',
      'Content-Type': 'application/json',
    })
    .get('/pokemon/2')
    .query({ name: 'gabriel' })
    .reply(200, { name: 'pikachu' });

  const response = await request(app(testConfig)).get(
    '/pokemon/2?name=gabriel'
  );
  expect(response.header['test-header']).toBe('pokemon-query-header');
  expect(response.body).toEqual({ name: 'pikachu' });
});

it('should handle default route with body', async () => {
  nock('http://pokeapi.co/api/v2')
    .defaultReplyHeaders({
      'test-header': 'pokemon-body-header',
      'Content-Type': 'application/json',
    })
    .post('/pokemon/3', (body) => body.pokemon)
    .reply(200, { name: 'pikachu' });

  const response = await request(app(testConfig))
    .post('/pokemon/3')
    .send({ pokemon: true });
  expect(response.header['test-header']).toBe('pokemon-body-header');
  expect(response.body).toEqual({ name: 'pikachu' });
});

['get', 'post', 'put', 'delete', 'options', 'patch'].forEach((method) => {
  it(`should handle ${method} request method`, async () => {
    nock.cleanAll();

    nock('http://pokeapi.co/api/v2')
      .defaultReplyHeaders({
        'test-header': method,
        'Content-Type': 'application/json',
      })
      [method]('/pokemon/4')
      .reply(200, { name: 'ivysaur' });

    const response = await request(app(testConfig))[method]('/pokemon/4');
    expect(response.header['test-header']).toBe(method);
    expect(response.body).toEqual({ name: 'ivysaur' });
  });
});
