import { useState } from "react"
import { gql } from "apollo-boost"
import { Mutation } from "react-apollo"

import isNotAuth from "../lib/is-not-auth"
import Router from "next/router"

const REGISTER_USER = gql`
  mutation CreateUserMutation(
    $clientMutationId: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
  ) {
    registerUser(
      input: {
        clientMutationId: $clientMutationId
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
      }
    ) {
      user {
        id
      }
    }
  }
`

const SignupForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const clientMutationId =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)

  return (
    <Mutation
      mutation={REGISTER_USER}
      onCompleted={data => {
        Router.push("/login")
      }}
      onError={error => console.log(error)}
    >
      {(registerUser, { error, loading, data }) => {
        return (
          <div>
            <h1>Signup</h1>
            {error && <p>Error is: {error.message}</p>}
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                registerUser({
                  variables: {
                    clientMutationId,
                    firstName,
                    lastName,
                    username,
                    email,
                  },
                })
              }}
            >
              <div>
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  type="text"
                  placeholder="firstName"
                />
              </div>
              <div>
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  type="text"
                  placeholder="lastName"
                />
              </div>

              <div>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                />
              </div>
              <div>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  placeholder="email"
                />
              </div>

              <br />
              <button>{loading ? "Loading" : "Signup"}</button>
            </form>
          </div>
        )
      }}
    </Mutation>
  )
}

export default isNotAuth(SignupForm)
