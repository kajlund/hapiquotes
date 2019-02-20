/**
 * Created by LuKa on 2019-01-02.
 * Application Manifest
 */

"use strict"

const Boom = require("boom")
const Config = require("getconfig")
const Log = require("consola")

if (!Config.webserver) {
  throw new Error("No webserver configured")
}

module.exports = {
  server: {
    app: Config,
    port: Config.webserver.port,
    tls: Config.webserver.tls,
    routes: {
      cors: Config.webserver.cors,
      validate: {
        failAction: (request, h, error) => {
          Log.error("Validation failure", error)
          throw Boom.badRequest(error.message)
        }
      }
    }
  },
  register: {
    plugins: [
      { plugin: require("inert") },
      { plugin: require("vision") },
      {
        plugin: require("hapi-dev-errors"),
        options: {
          showErrors: Config.webserver.env === "development"
        }
      },
      { plugin: "./db", options: Config.db },
      { plugin: "./services" },
      { plugin: "./website", options: Config }
    ]
  }
}
