// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


const resolvers = {

//conver controller code into here CRUD
  // getSingleUser
  // createUser
  // login
  // saveBook
  // deleteBook
  Query: {
    User: async () => {
      return User.find({  username, email, password  });
  
    },
  },
    Mutation: {
      createUser: async (parent, args) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      }
  },
  saveBook: async (parent, { bookData }, context) => {
    if(context.user){
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
  },
  deleteBook: async (parent, { bookId }, context) => {
    if(context.user){
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



  };


module.exports = resolvers;
