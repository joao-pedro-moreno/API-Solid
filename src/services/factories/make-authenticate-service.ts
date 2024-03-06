import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateService(usersRepository)

  return useCase
}
