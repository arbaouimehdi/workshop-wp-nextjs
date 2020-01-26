import { useState, useEffect } from "react"
import Router from "next/router"

import { isUserValidated } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"

const MyProfile = () => {
  const [showContent, setShowContent] = useState(false)
  const [userData, setUserData] = useState("")

  useEffect(() => {
    const userValidatedData = isUserValidated()

    if (!isEmpty(userValidatedData)) {
      setUserData(userValidatedData)
      setShowContent(true)
    }

    //
    else {
      // If user is not logged in send the user back to login page.
      Router.push("/login")
    }
  }, [])

  return (
    <div>
      {showContent ? (
        <div>
          <h1>My Account</h1>
          <i>Howdy {userData.user.nicename}!</i>
          <br />
          <b>email: {userData.user.email}</b>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default MyProfile
