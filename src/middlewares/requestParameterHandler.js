const { parseJSON } = require('../utils/helpers');

const getRequestParams = (req) => {
  const allParams = {};
  const params = req.params || {};
  const body = req.body || {};
  const query = req.query || {};

  Object.keys(params).forEach((key) => {
    allParams[key] = params[key];
  });

  Object.keys(body).forEach((key) => {
    if (allParams[key] === undefined) {
      allParams[key] = body[key];
    }
  });

  Object.keys(query).forEach((key) => {
    if (allParams[key] === undefined) {
      allParams[key] = parseJSON(query[key]);
    }
  });

  allParams.context = req.context;

  return allParams;
};

// Middleware to consolidate request parameters
const aggregateRequestDataMiddleware = (req, res, next) => {
  req.allParams = getRequestParams(req);
  next();
};

module.exports = aggregateRequestDataMiddleware;
