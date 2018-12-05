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
    // refetchQueries will not recover from error!
    // use getUserIdOptional instead when possible
    // https://github.com/apollographql/react-apollo/issues/2070
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

module.exports = {
  getUserId,
  getUserIdOptional,
  AuthError,
};
