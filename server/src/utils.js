const jwt = require('jsonwebtoken');

function getUserId(ctx, optional = false) {
  const Authorization = ctx.request.get('Authorization');
  const headerToken = Authorization && Authorization.replace('Bearer ', '');
  const cookieToken = ctx.request.cookies.token;
  const token = cookieToken || headerToken;

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  if (!optional) {
    throw new AuthError();
  }

  return -1;
}

function getUserIdOptional(ctx) {
  return getUserId(ctx, true);
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

const sendCookieTokenMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  const { user } = jwt.verify(token, process.env.APP_SECRET);
  if (user) {
    req.user = user;
  }
  return next();
};

module.exports = {
  getUserId,
  getUserIdOptional,
  AuthError,
  sendCookieTokenMiddleware,
};
