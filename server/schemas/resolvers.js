// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
 

const resolvers = {

  Query: {
    me: async () => {
      console.log(context.user, "this is test")
      if (context.user) {
       
        return await User.findOne({ _id: context.user._id });
      }
       throw new AuthenticationError("Must be logged in");

    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password } ) => {
      
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
 
  saveBook: async (parent, { bookData }, context) => {
      console.log(bookData)
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: bookData },
          },
          {
            new: true,
          }
        );
      
      }
      throw new AuthenticationError("Must be logged In...");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
    },

    //login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
  },


};


module.exports = resolvers;