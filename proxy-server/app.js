const express = require('express');
const parse = require('url-parse');

const axios = require('axios').default;

function application(config) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // add all beforeRequestPlugins like middlewares
  config.beforeRequestPlugins.forEach((p) => app.use(p));

  // handle all routes and methods
  app.all(
    '/*',
    async (req, res, next) => {
      const url = parse(req.url, true);
      const paramsList = url.pathname.split('/').filter((u) => u !== ''); // extract the paramsList from url
      const domain = paramsList[0]; // find the upstream domain by first url param
      const configUrl = config.upstream[domain];
      const baseUrl = configUrl || config.upstream['default']; // get baseUrl by upstream config

      const reqUrl = (!!configUrl ? paramsList.slice(1) : paramsList).join('/'); // slice paramsList and get only reqUrl

      delete req.headers['content-length']; // remove header to handle same header error

      try {
        const response = await axios({
          method: req.method.toLowerCase(),
          url: `${baseUrl}/${reqUrl}`,
          params: url.query,
          data: req.body, // https://github.com/chimurai/http-proxy-middleware
          headers: {
            ...req.headers,
            host: req.headers.host === 'localhost:3000' ? '' : req.headers.host, // handle https errors with localhost
          },
        });

        const headers = { ...response.headers, ...req.headers };
        res.set(headers);
        res.status(response.status);

        res.body = response.data; // set body to work with this on afterRequestPlugin

        config.afterRequestPlugins.forEach((p) => p(req, res, next)); //add all afterRequestPlugins like middlewares
      } catch (err) {
        const { response, message, code } = err;
        if (response) {
          res.set(response.headers);
          res.status(response.status);
          res.json(response.data);
        } else {
          res.json({ message, code });
        }
      }
      next();
    });

  app.use((_, res) => res.send(res.body));

  return app;
}

module.exports = application;
