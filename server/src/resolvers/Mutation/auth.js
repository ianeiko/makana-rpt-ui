const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    });

    return {
      token: jwt.sign(
        { userId: user.id, name: user.name },
        process.env.APP_SECRET
      ),
      user
    };
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, process.env.APP_SECRET);
    const DAYS_7 = 1000 * 60 * 60 * 24 * 7;
    const cookieOptions = { httpOnly: true, maxAge: DAYS_7 };
    ctx.response.cookie('token', token, cookieOptions);

    return { user, token };
  },

  logout(parent, variables, ctx) {
    ctx.response.clearCookie('token');
    return true;
  }
};

module.exports = { auth };
