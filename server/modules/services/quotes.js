/**
 * Created by LuKa on 2019-01-19.
 * Quote services.
 */

"use strict"

const { model } = require("mongoose")

const Quote = model("Quote")

const getPopularQuotes = () => {
  return Quote.find()
    .limit(5)
    .sort({ votes: -1 })
}

module.exports = [
  {
    name: "services.quotes.getPopular",
    method: getPopularQuotes
  }
]
