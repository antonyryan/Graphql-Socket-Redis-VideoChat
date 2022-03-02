import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import jwt from 'jsonwebtoken';

const SignupUserOutputType = new GraphQLObjectType({
  name: 'SignupUserResult',
  fields: {
    success: {
      type: GraphQLBoolean,
      resolve: obj => obj.success,
    },
    message: {
      type: GraphQLString,
      resolve: obj => obj.message,
    },
  },
});

export default {
  type: SignupUserOutputType,
  name: 'SignupUser',
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, { email, username, password }, req) {
    try {
      let [user, created] = await models.user.findOrInitialize({ // eslint-disable-line prefer-const
        where: {
          username: { $iLike: username.replace(/\s/i, '') },
          email: email.trim().toLowerCase(),
        },
        defaults: { password },
      });
      if (!created) return { success: false, message: 'There is already an account with that email/username' };
      user = await user.save();
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
      req.cookies.set(process.env.COOKIE_KEY, token, { signed: true, maxAge: Date.now() + (24 * 60 * 60 * 1e3) });
      return { success: true, message: 'success' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Something went wrong signing you up' };
    }
  },
};
