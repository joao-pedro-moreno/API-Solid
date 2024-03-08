import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
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
