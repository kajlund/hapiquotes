/**
 * Created by LuKa on 2019-01-19.
 * Services plugin.
 */

"use strict"

const name = "services"
const version = "1.0.0"

const register = server => {
  server.log("info", `Registering plugin ${name} v.${version}`)

  const services = [].concat(require("./quotes"), require("./users"))

  server.method(services)
}

exports.plugin = { register, name, version }
