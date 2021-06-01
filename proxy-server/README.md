# Proxy Server

## Roadmap
- Implement specific plugins by upstreams

## config API

```javascript
const logger = require('./plugins/logger');

const config = {
  port: 3000, // port that the proxy server will run
  upstream: { // <key>:<domain> that the proxy will handle by route
    // localhost:3000/pokeapi/pokemon/1 -> http://pokeapi.co/api/v2/pokemon/1
    pokeapi: 'http://pokeapi.co/api/v2', 
    // default upstream localhost:3000/pokemon/1 -> http://pokeapi.co/api/v2/pokemon/1
    default: 'http://pokeapi.co/api/v2', 
    hookbin: 'https://hookb.in/3OZj819xd0HEwwjBl0za',
  },
  // plugins executed before the request
  beforeRequestPlugins: [logger(console.log)],
  // plugins executed after the request
  afterRequestPlugins: [],
};

module.exports = config;
```

## build your own plugin

```javascript
function logger() {
  // plugin should return a function that receive request, response and next like a express midddleware https://expressjs.com/en/guide/using-middleware.html
  return (req, res, next) => {
    console.log(`Request method: ${req.method}`);
    next();
  };
}

module.exports = logger;
```

## Installation

```bash
yarn install
```

## Running tests

```bash
yarn test
```

