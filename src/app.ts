import fastify from 'fastify'
import { appRoutes } from './http/routes'

// MVC => Model, View & Controller

export const app = fastify()

app.register(appRoutes)
