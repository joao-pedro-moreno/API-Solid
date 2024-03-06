import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymService } from '../create-gym'

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymService(gymsRepository)

  return useCase
}
