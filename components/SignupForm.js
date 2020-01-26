import { useState } from "react"
import { gql } from "apollo-boost"
import { Mutation } from "react-apollo"

import isNotAuth from "../lib/is-not-auth"

const CREATE_USER = gql`
  mutation CreateUser(
    $clientMutationId: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
        clientMutationId: $clientMutationId
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      }
    ) {
      user {
        id
      }
    }
  }
`

const SignupForm = () => {
  return <div>Signup component</div>
}

export default isNotAuth(SignupForm)
