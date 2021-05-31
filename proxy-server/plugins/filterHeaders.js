function filter(headers) {
  return (_, res, next) => {
    try {
      headers.forEach((h) => {
        res.removeHeader(h);
      });
      next();
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = filter;
