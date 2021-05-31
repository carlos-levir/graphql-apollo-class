const { ApolloServer, gql } = require('apollo-server');

const users = [
  {
    name: 'Carlos Levir',
    age: 22,
  },
];

function findUserInDataBase(_, args) {
  return users.find((user) => user.name === args.name);
}

function createUser(_, args) {
  const user = {
    name: args.name,
    age: args.age,
  };
  users.push(user);

  return user;
}

const typeDefs = gql`
  type User {
    name: String!
    age: Int
  }

  type Query {
    getUser(name: String): User!
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, age: Int!): User
  }
`;

const resolvers = {
  Query: {
    getUser: findUserInDataBase,
    getUsers: () => users,
  },
  Mutation: {
    createUser: createUser,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
