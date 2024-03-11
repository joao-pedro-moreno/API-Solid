import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const { sub, role } = req.user

  const token = await res.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
        expiresIn: '7d', // Tempo que o usuário tem que ficar sem utilizar a aplicação para perder a autenticação
      },
    },
  )

  return res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // HTTPs
      sameSite: true,
      httpOnly: true, // Não fica salvo no front-end
    })
    .send({ token })
}
