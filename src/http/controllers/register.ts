import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerService } from '@/services/register'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerService({ name, email, password })
  } catch (err) {
    return res.status(409).send()
  }

  return res.status(201).send()
}
