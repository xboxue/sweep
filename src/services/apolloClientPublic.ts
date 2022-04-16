import {
  ApolloClient,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_PUBLIC_API_URL,
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.extensions.code === "UNAUTHENTICATED") {
        return fromPromise(
          window.xprops.getToken(true).catch((error) => console.log(error))
        ).flatMap(() => forward(operation));
      }
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const token = await window.xprops.getToken();

  return {
    headers: {
      ...headers,
      "business-id": window.xprops.businessId,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
