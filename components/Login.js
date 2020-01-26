import { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Router from "next/router"

import { isUserValidated } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"

/**
 * GraphQL mutation used for logging in
 * Returns an authToken and nickname
 */
const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
    $clientMutationId: String!
  ) {
    login(
      input: {
        clientMutationId: $clientMutationId
        username: $username
        password: $password
      }
    ) {
      authToken
      user {
        id
        userId
        name
        email
        nicename
        firstName
        lastName
      }
    }
  }
`

const Login = () => {
  const [username, setUsername] = useState("mehdi")
  const [password, setPassword] = useState("mehdi")

  const clientMutationId =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)

  //
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      // const { authToken, user } = data.login
      localStorage.setItem(process.env.AUTH_TOKEN, JSON.stringify(data.login))
      Router.push("/my-profile")
    },
  })

  // Check if the user is validated already.
  if (process.browser) {
    const userValidated = isUserValidated()

    // If user is already validated, redirect user to My Account page.
    if (!isEmpty(userValidated)) {
      Router.push("/my-profile")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p>Error is: {error.message}</p>}
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          login({
            variables: {
              username,
              password,
              clientMutationId,
            },
          })
        }}
      >
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          className="round-btn invert ba bw1 pv2 ph3"
          type="submit"
          value="Log in"
        />
      </form>
    </div>
  )
}

export default Login
