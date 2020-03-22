const withGraphql = require("next-plugin-graphql");

module.exports = withGraphql({
  webpack(config, _options) {
    return config;
  },
  env: {
    APOLLO_SERVER_URL:
      process.env.APOLLO_SERVER_URL || "http://localhost:3000/api/graphql"
  }
});
