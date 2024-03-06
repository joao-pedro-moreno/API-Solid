import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInService(checkInsRepository)

  return useCase
}
