import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async exec({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
