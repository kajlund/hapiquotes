/**
 * Created by LuKa on 2019-01-02.
 * Web module
 */

"use strict"

const Mongoose = require("mongoose")
const Seeder = require("mongoose-seed")

const data = require("./seed")

// Mongoose to use ES6 promises
Mongoose.Promise = global.Promise

const Quote = require("./quote")
const User = require("./user")
const name = "db"
const version = "1.0.0"

const register = async (server, cnf) => {
  server.log("info", `Registering plugin ${name} v.${version}`)

  let conn = null
  // Connect to database
  try {
    conn = await Mongoose.connect(
      cnf.uri,
      cnf.options
    )
    console.log("✅ MongoDB connected")
    server.app.db = conn.db
    server.app.models = { Quote, User }
    if (cnf.seed) {
      Seeder.connect(
        cnf.uri,
        function() {
          Seeder.loadModels(["./src/modules/db/user.js", "./src/modules/db/quote.js"])
          Seeder.clearModels(["User", "Quote"], function() {
            Seeder.populateModels(data, function() {
              Seeder.disconnect()
            })
          })
        }
      )
    }
  } catch (err) {
    console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
    throw err
  }
}

exports.plugin = { register, name, version }
