const { ApolloServer } = require('apollo-server-lambda');
const AWS = require('aws-sdk');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');


const getCognitoUserDetails = async (event) => {
  if (process.env.IS_OFFLINE) {
    // Cognito auth does not work offline as it requires API Gateway. So mock a user
    console.log('Offline mode so mocking current user');
    return {
      id: 'abcd-123-defg-123',
      'custom:tenantId': 'MockCorp',
      sub: 'abcd-123-defg-123',
      email: 'user@mock.com',
    };
  }

  const cognitoClient = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-2' });
  // Get the unique ID given by cognito for this user, it is passed to lambda as part of a large string in event.requestContext.identity.cognitoAuthenticationProvider
  const userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1];
  const request = {
    UserPoolId: 'us-east-2_uSQ2m25O5',
    Filter: `sub = '${userSub}'`,
    Limit: 1,
  };

  const results = await cognitoClient.listUsers(request).promise();
  const cognitoUser = results.Users[0];
  const user = {};
  user.id = cognitoUser.Username;
  cognitoUser.Attributes.forEach((item) => {
    user[item.Name] = item.Value;
  });

  return user;
};


/**
 * GraphQL handler logic using apollo-server-lambda
 * For doc please see:
 * https://www.apollographql.com/docs/apollo-server/deployment/lambda.html#Deploying-with-the-Serverless-Framework
 */
const createHandler = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (req) => {
      const user = await getCognitoUserDetails(req.event);
      console.log('Logged in user:', JSON.stringify(user));
      return { user };
    },
  });
  return server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
};

exports.graphqlHandler = (event, context, callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
