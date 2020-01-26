import { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Router from "next/router"
import { Mutation } from "react-apollo"

import { isUserValidated } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"

const UPDATE_USER = gql`
  mutation UpdateUserMutation(
    $clientMutationId: String!
    $id: ID!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    updateUser(
      input: {
        clientMutationId: $clientMutationId
        id: $id
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      user {
        firstName
        lastName
      }
    }
  }
`

const UpdateProfile = ({ userId }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  const clientMutationId =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)

  return (
    <Mutation mutation={UPDATE_USER} onError={error => console.log(error)}>
      {(updateUser, { error, loading, data }) => {
        return (
          <div>
            <h1>Update Infos</h1>
            {error && <p>Error is: {error.message}</p>}
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                updateUser({
                  variables: {
                    clientMutationId,
                    id: userId,
                    firstName,
                    lastName,
                    password,
                  },
                })
              }}
            >
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                placeholder="firstName"
              />
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                placeholder="lastName"
              />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <input type="submit" value="Update User" />
            </form>
          </div>
        )
      }}
    </Mutation>
  )
}

export default UpdateProfile
