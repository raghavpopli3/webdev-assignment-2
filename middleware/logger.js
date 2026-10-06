/**
 * Custom Logger Middleware
 * Requirement: Logs HTTP Method, requested URL, and current timestamp.
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] Method: ${method} | URL: ${url}`);
  next();
};

module.exports = logger;
