import { SearchGymsService } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsService(gymsRepository)

  return useCase
}
