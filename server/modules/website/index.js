/**
 * Created by LuKa on 2019-01-02.
 * Web module
 */

'use strict'

const Path = require('path')

const name = 'website'
const version = '1.0.0'

const viewsPath = Path.resolve(process.cwd(), 'public', 'views')

const topQuotes = [
  {
    author: 'Jeremy S. Anderson',
    content:
            'There are two major products that come out of Berkeley: LSD and UNIX.  We don’t believe this to be a coincidence.',
    votes: 100,
    categories: ['IT'],
    lang: 'en',
    createdAt: '2013-04-13T17:15:23.891Z',
    updatedAt: '2013-04-13T17:15:23.891Z'
  },
  {
    author: 'Thomas Watson, chairman of IBM, 1943',
    content: 'I think there is a world market for maybe five computers.',
    votes: 123,
    categories: ['IT'],
    lang: 'en',
    createdAt: '2013-04-13T17:15:23.950Z',
    updatedAt: '2013-04-13T17:15:23.950Z'
  },
  {
    author: 'Edsger W. Dijkstra',
    content: 'The question of whether computers can think is like the question of whether submarines can swim.',
    votes: 134,
    categories: ['IT'],
    lang: 'en',
    createdAt: '2013-04-13T17:15:23.913Z',
    updatedAt: '2013-04-13T17:15:23.913Z'
  },
  {
    author: 'Popular Mechanics, forecasting the relentless march of science, 1949',
    content: 'Computers in the future may weigh no more than 1.5 tons.',
    votes: 157,
    categories: ['IT'],
    lang: 'en',
    createdAt: '2013-04-13T17:15:23.962Z',
    updatedAt: '2013-04-13T17:15:23.962Z'
  },
  {
    author: 'Steve McConnell',
    content: 'Good code is its own best documentation.',
    votes: 156,
    categories: ['IT'],
    lang: 'en',
    createdAt: '2013-04-13T17:15:23.851Z',
    updatedAt: '2013-04-13T17:15:23.851Z'
  }
]

const register = async (server, config) => {
  server.log('info', `Registering plugin ${name} v.${version}`)
  server.dependency(['inert', 'vision'])

  server.views({
    engines: { hbs: require('handlebars') },
    context: () => {
      return {
        description: config.client.description,
        name: config.client.name,
        title: 'HapiQuotes',
        version: config.client.version,
        year: new Date().getFullYear()
      }
    },
    path: viewsPath,
    layout: true,
    layoutPath: Path.resolve(viewsPath, 'layouts'),
    partialsPath: Path.resolve(viewsPath, 'partials'),
    isCached: process.env.NODE_ENV === 'production',
    helpersPath: Path.resolve(viewsPath, 'helpers')
  })

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.view('index', {
          quotes: topQuotes,
          pageTitle: 'Welcome!'
        })
      }
    },
    {
      method: 'GET',
      path: '/js/{path*}',
      config: {
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        },
        handler: { directory: { path: './public/js' } }
      }
    },
    {
      method: 'GET',
      path: '/css/{path*}',
      config: {
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        },
        handler: { directory: { path: './public/css' } }
      }
    },
    {
      method: 'GET',
      path: '/img/{path*}',
      config: {
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        },
        handler: { directory: { path: './public/img' } }
      }
    }
  ])
}

exports.plugin = { register, name, version }
