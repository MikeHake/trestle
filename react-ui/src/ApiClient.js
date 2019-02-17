
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const DEV_URL = 'https://84trov9yy0.execute-api.us-east-1.amazonaws.com/dev/graphql';
const LOCAL_URL = 'http://localhost:3000/graphql';

// const httpLink = createHttpLink({
//   uri: DEV_URL
// });

const httpLink = new HttpLink({
  uri: DEV_URL,
  headers: {
    authorization: 'foo'
  },
});

// const authLink = setContext((_, { headers }) => {
//   // The auth token is saved to local storage in App.js
//   const token = localStorage.getItem('token');
//   console.log("Found in local storage:", token);
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   fetchOptions: {
//     mode: 'no-cors',
//   }
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  }
});

export default client;