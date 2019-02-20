/**
 * Created by LuKa on 2019-01-02.
 * Web module
 */

"use strict"

const Path = require("path")

const Boom = require("boom")

const name = "website"
const version = "1.0.0"

const viewsPath = Path.resolve(process.cwd(), "public", "views")

const register = async (server, config) => {
  server.log("info", `Registering plugin ${name} v.${version}`)
  server.dependency(["inert", "vision"])

  server.views({
    engines: { hbs: require("handlebars") },
    context: () => {
      return {
        description: config.client.description,
        name: config.client.name,
        title: "HapiQuotes",
        version: config.client.version,
        year: new Date().getFullYear()
      }
    },
    path: viewsPath,
    layout: true,
    layoutPath: Path.resolve(viewsPath, "layouts"),
    partialsPath: Path.resolve(viewsPath, "partials"),
    isCached: process.env.NODE_ENV === "production",
    helpersPath: Path.resolve(viewsPath, "helpers")
  })

  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        const data = await server.methods.services.quotes.getPopular()
        return h.view("index", {
          quotes: data,
          pageTitle: "Welcome!"
        })
      }
    },
    {
      method: "GET",
      path: "/js/{path*}",
      config: {
        plugins: {
          "hapi-auth-cookie": {
            redirectTo: false
          }
        },
        handler: { directory: { path: "./public/js" } }
      }
    },
    {
      method: "GET",
      path: "/css/{path*}",
      config: {
        plugins: {
          "hapi-auth-cookie": {
            redirectTo: false
          }
        },
        handler: { directory: { path: "./public/css" } }
      }
    },
    {
      method: "GET",
      path: "/img/{path*}",
      config: {
        plugins: {
          "hapi-auth-cookie": {
            redirectTo: false
          }
        },
        handler: { directory: { path: "./public/img" } }
      }
    },
    // Anything else gets a 404
    {
      method: ["GET", "POST"],
      path: "/{path*}",
      config: {
        handler: (request, h) => {
          const accept = request.headers.accept

          if (accept && accept.match(/json/)) {
            return Boom.notFound("Resource not found.")
          }

          return h.view("404").code(404)
        }
      }
    }
  ])
}

exports.plugin = { register, name, version }
