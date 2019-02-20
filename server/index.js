/**
 * Created by LuKa on 2019-01-02.
 * Starter file for hapi.js web server(s) in ./src folder
 */

"use strict"

const Path = require("path")

const Glue = require("glue")
const Log = require("consola")

let server

process.on("uncaughtException", err => {
  Log.error(err)
  process.exit(1)
})

process.on("unhandledRejection", reason => {
  Log.error(reason)
  process.exit(1)
})

// listen on SIGINT signal and gracefully stop the server
process.on("SIGINT", async () => {
  Log.warn("SIGINT Signal Received - Stopping Server")
  try {
    await server.stop({ timeout: 10000 })
    Log.warn("Hapi server stopped")
    process.exit(0)
  } catch (err) {
    Log.error("Exception thrown trying to close server", err)
    process.exit(1)
  }
})

// Initialize and start web server
;(async () => {
  const manifest = require("./manifest")

  try {
    Log.info("Composing server...")
    server = await Glue.compose(
      manifest,
      { relativeTo: Path.join(__dirname, "modules") }
    )
    Log.info("Starting server...")
    await server.start()
    Log.info(`Server running at: ${server.info.uri}`)
  } catch (err) {
    Log.error("Error starting server", err)
    process.exit(1)
  }
})()
