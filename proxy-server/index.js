const app = require('./app');
const config = require(process.env.PROXYCONFIG || './config');

app(config).listen(config.port, () => {
  console.log(`Proxy server listening at http://localhost:${config.port}`);
});
