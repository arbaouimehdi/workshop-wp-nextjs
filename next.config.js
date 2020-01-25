require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  env: {
    WORDPRESS_API_URI: process.env.WORDPRESS_API_URI,
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
    }

    return config
  },
}
