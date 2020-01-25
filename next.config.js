require("dotenv").config()

module.exports = {
  env: {
    WORDPRESS_API_URI:
      process.env.NODE_ENV == "development"
        ? process.env.WORDPRESS_API_URI
        : "https://nextjsapi.sinj.app/graphql",
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
    }

    return config
  },
}
