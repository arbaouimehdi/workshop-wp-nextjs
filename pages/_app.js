import App, { Container } from "next/app"
import React from "react"
import withApollo from "../lib/with-apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import Menu from "../components/Menu"

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Menu />
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
