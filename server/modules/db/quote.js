"use strict"

const { model, Schema } = require("mongoose")

const quoteSchema = new Schema(
  {
    author: {
      type: String,
      trim: true,
      required: true
    },
    content: String,
    votes: {
      type: Number,
      default: 0
    },
    categories: [String],
    language: String,
    user: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
)

module.exports = model("Quote", quoteSchema)
