import fastify from 'fastify'
import { appRoutes } from './http/routes'

// SOLID => Uncle Bob (Clean Code)

export const app = fastify()

app.register(appRoutes)
