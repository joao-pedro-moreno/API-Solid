import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify()

  return res.status(200).send()
}
