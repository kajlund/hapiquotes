/**
 * Created by LuKa on 2019-01-19.
 * User services.
 */

"use strict"

const { model } = require("mongoose")

const User = model("User")

const getByEmail = email => User.findByEmail(email)

module.exports = [
  {
    name: "services.users.getByEmail",
    method: getByEmail
  }
]
