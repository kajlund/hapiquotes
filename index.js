/**
 * Created by LuKa on 2019-01-02.
 * Starter file for hapi.js web server(s) in ./src folder
 */

"use strict"

/* eslint no-console: 0 */

let server

const webserver = require("./src/webserver.js")

// Compose and start website server
const start = async () => {
  server = await webserver.compose()
  await server.start()
  server.log("info", `Server started at ${server.info.uri}`)
}

process.on("uncaughtException", err => {
  console.error("Caught unhandled exception", err.message || err)
  console.error(err.stack || "")
  process.exit(1)
})

process.on("unhandledRejection", (err, p) => {
  if (err instanceof Error) {
    console.error(`Caught unhandled rejection: ${err.message || err}`)
    console.error(err.stack || "")
  } else {
    console.error(`Caught unhandled rejection: ${err}`, p)
  }
  process.exit(1)
})

// listen on SIGINT signal and gracefully stop the server
process.on("SIGINT", async () => {
  console.log("Stopping hapi server")
  try {
    await server.stop({ timeout: 10000 })
    console.log("Hapi server stopped")
    process.exit(0)
  } catch (err) {
    console.error("Exception thrown trying to close server", err)
    process.exit(1)
  }
})

start()
