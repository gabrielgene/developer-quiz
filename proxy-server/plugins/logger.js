function logger(loggerFunction = console.log) {
  return (req, _, next) => {
    // workarround to mock Date.now in tests
    const currentDate = new Date(Date.now());
    loggerFunction(
      `[${currentDate.toISOString()}] - ${req.method} - ${req.url}`
    );
    next();
  };
}

module.exports = logger;
