const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  bookCount: Int
  email: String!
  savedBooks: [Book]!
}

type Book {
    bookID: ID!
    authors: [String]
    description: String
    title: String!
    image:String
    link:String

  }
  type Auth {
    token: ID!
    user: User
  }
 # type Query {
  
#  users: [User]
 #   user(username: String!): User
   # books: [Book]
  #  Book(bookID: ID!): Book
    
    
  #}
type Query {
me: User
} 
input bookInput {
authors: [String],
bookID: String!
    description: String!
    title: String!
    image:String
    link:String
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: bookInput!): User
    removeBook(bookID: ID!): User
    
  }
`;

module.exports = typeDefs;

