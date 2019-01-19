/**
 * Created by LuKa on 2018-01-02
 * Sanity Tests
 */

"use strict"

/* Import dependencies */
const { expect } = require("code")
const Lab = require("lab")
const { describe, it } = (exports.lab = Lab.script())

// const server = require("../server/webserver");

/* Sanity Test Suite */
describe("Sanity tests", () => {
  // Test that Lab is available
  describe("Lab", () => {
    it("exists", () => {
      expect(Lab).to.exist()
    })

    it("has properties", () => {
      expect(Object.keys(Lab)).to.not.be.empty()
    })
  })
})
