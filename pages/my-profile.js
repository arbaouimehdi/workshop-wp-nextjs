import { useState, useEffect } from "react"
import Router from "next/router"

import { isUserValidated } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"
import UpdateProfile from "../components/UpdateProfile"

import isAuth from "../lib/is-auth"

const MyProfile = () => {
  const [userData, setUserData] = useState("")

  useEffect(() => {
    const userValidatedData = isUserValidated()

    if (!isEmpty(userValidatedData)) {
      setUserData(userValidatedData)
    }
  }, [])

  return (
    <div>
      {userData ? (
        <div>
          <h1>My Account</h1>
          <i>
            Howdy {userData.user.firstName} {userData.user.lastName}!
          </i>
          <br />
          <b>email: {userData.user.email}</b>

          <div>
            <UpdateProfile setUserData={setUserData} userData={userData} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default isAuth(MyProfile)
