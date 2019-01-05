/**
 * Created by LuKa on 2019-01-02.
 * Starter file for hapi.js web server(s) in ./server folder
 */

'use strict'

/* eslint no-console: 0 */

const webserver = require('./server/webserver.js')

// Compose and start website server
const start = async () => {
  const srv = await webserver.compose()
  await srv.start()
  srv.log('info', `Server started at ${srv.info.uri}`)
}

start()

process.on('uncaughtException', err => {
  console.error('Caught unhandled exception', err.message || err)
  console.error(err.stack || '')
  process.exit(1)
})

process.on('unhandledRejection', (err, p) => {
  if (err instanceof Error) {
    console.error(`Caught unhandled rejection: ${err.message || err}`)
    console.error(err.stack || '')
  } else {
    console.error(`Caught unhandled rejection: ${err}`, p)
  }
  process.exit(1)
})
