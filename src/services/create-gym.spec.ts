import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.exec({
      title: "Moreno's Gym",
      description: 'The best gym of your neighborhood',
      phone: 'Phone Number',
      latitude: -27.07,
      longitude: -49.48,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
