import { useEffect, useState } from "react"
import Link from "next/link"
import { isUserValidated, logoutUser } from "../lib/auth-functions"
import isEmpty from "../lib/helpers"

const Menu = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogout = () => {
    if (process.browser) {
      logoutUser("/login")
    }
  }

  useEffect(() => {
    if (process.browser) {
      const userValidated = isUserValidated()

      // If user is not validated, then logout button should be shown.
      if (!isEmpty(userValidated)) {
        setLoggedIn(true)
      }
    }
  })

  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>

      <li>
        <Link href="/my-profile">
          <a>My Profile</a>
        </Link>
      </li>

      {loggedIn ? (
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}

export default Menu
