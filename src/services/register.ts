import { PrismaUsersRepository } from './../repositories/prisma-users-repository'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  const password_hash = await hash(password, 6)

  const userWithAsameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithAsameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    email,
    name,
    password_hash,
  })
}
