import {
  ApolloClient,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { relayStylePagination } from "@apollo/client/utilities";
import { getToken } from "./firebase";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_ADMIN_API_URL,
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.extensions.code === "UNAUTHENTICATED") {
        return fromPromise(
          getToken(true).catch((error) => console.log(error))
        ).flatMap(() => forward(operation));
      }
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (await getToken()) || localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: { Query: { fields: { problems: relayStylePagination() } } },
  }),
});

export default client;
