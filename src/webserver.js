/**
 * Created by LuKa on 2019-01-02.
 * Export compose function for website server setup.
 */

'use strict'

const path = require('path')

const Config = require('getconfig')
const Glue = require('glue')

if (!Config.webserver) {
  throw new Error('No webserver configured')
}

const opts = {
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [ { log: '*', response: '*', request: '*' } ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
}

const rootDir = path.join(__dirname, 'modules')

const manifest = {
  server: {
    app: Config,
    port: Config.webserver.port,
    tls: Config.webserver.tls,
    routes: {
      cors: Config.webserver.cors
    }
  },
  register: {
    plugins: [
      { plugin: require('good'), options: opts },
      { plugin: require('inert') },
      { plugin: require('vision') },
      { plugin: './website', options: Config }
    ]
  }
}

exports.compose = async () => {
  try {
    const srv = await Glue.compose(
      manifest,
      { relativeTo: rootDir }
    )
    await srv.initialize()
    srv.log('info', 'Server initialized')
    return srv
  } catch (error) {
    throw error
  }
}
