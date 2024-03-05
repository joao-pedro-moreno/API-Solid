import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlrealdyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerService = makeRegisterService()

    await registerService.exec({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlrealdyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send()
}
