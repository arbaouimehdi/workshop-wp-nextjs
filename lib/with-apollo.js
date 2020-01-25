import withApollo from "next-with-apollo"
import { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({
  uri: "http://api-wordpress.test:8888/graphql",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("hollymolly")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "http://api-wordpress.test:8888/graphql",
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    },
  },
)
