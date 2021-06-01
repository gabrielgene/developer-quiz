const app = require('./app');
const config = require(process.env.CONFIG || './config');

app(config).listen(config.port, () => {
  console.log(`Proxy server listening at http://localhost:${config.port}`);
});
