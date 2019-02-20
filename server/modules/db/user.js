"use strict"

const Bcrypt = require("bcryptjs")
const Config = require("getconfig")
const { model, Schema } = require("mongoose")
const Validator = require("validator")

const SALT_WORK_FACTOR = Config.auth.rounds

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: {
        isAsync: true,
        validator: Validator.isEmail,
        message: "Invalid email address"
      }
    },
    password: String
  },
  {
    timestamps: true
  }
)

/**
 * Static Methods
 */
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email })
}

/**
 * Instance Methods
 */
userSchema.methods.hashPassword = async function() {
  const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR)
  const hash = await Bcrypt.hash(this.password, salt)
  this.password = hash
  return this
}

userSchema.methods.comparePassword = async function(pwd) {
  const isMatch = await Bcrypt.compare(pwd, this.password)
  return isMatch
}

module.exports = model("User", userSchema)
