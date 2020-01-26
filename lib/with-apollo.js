import withApollo from "next-with-apollo"
import { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({
  uri: process.env.WORDPRESS_API_URI,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("hollymolly")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${JSON.parse(token).authToken}` : "",
    },
  }
})

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: process.env.WORDPRESS_API_URI,
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
