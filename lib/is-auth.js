import React, { useState, useEffect } from "react"
import Router from "next/router"

import { isUserValidated } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"

const isAuth = BaseComponent => props => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const userValidatedData = isUserValidated()

    if (!isEmpty(userValidatedData)) {
      setShowContent(true)
    }

    //
    else {
      // If user is not logged in send the user back to login page.
      Router.push("/login")
    }
  }, [])

  return <div>{showContent ? <BaseComponent {...props} /> : ""}</div>
}

export default isAuth
