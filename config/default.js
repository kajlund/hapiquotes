/**
 * Created by LuKa on 2019-01-02.
 * Default i.e. development configuration
 */

"use strict"

const pack = require("../package.json")

module.exports = {
  auth: {
    algorithm: "$AUTH_ALGORITHM",
    secret: "$AUTH_SECRET",
    rounds: "$AUTH_ROUNDS::number"
  },
  client: {
    name: pack.name,
    description: pack.description,
    version: pack.version
  },
  db: {
    seed: false,
    uri: "$MONGODB_URI",
    options: {
      keepAlive: 300000,
      connectTimeoutMS: 300000,
      useNewUrlParser: true
    }
  },
  webserver: {
    cors: false, // Cross-Origin Resource Sharing ability (true/false)
    env: "$NODE_ENV",
    https: false,
    port: "$PORT::number",
    publicFolder: "",
    tls: false
  }
}
