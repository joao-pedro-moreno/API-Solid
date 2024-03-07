import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
