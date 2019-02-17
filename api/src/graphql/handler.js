const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

/**
 * GraphQL handler logic using apollo-server-lambda
 * For doc please see:
 * https://www.apollographql.com/docs/apollo-server/deployment/lambda.html#Deploying-with-the-Serverless-Framework
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => {
    // TODO - figure out user and set it on context. See Apollo server docs.
    console.log('Request:', JSON.stringify(req));

    // add the user to the context
    return { foo: 'bar' };
  },
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
