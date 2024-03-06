import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search a gym', async () => {
    await gymsRepository.create({
      title: "Moreno's Gym",
      description: 'The best gym of your neighborhood',
      phone: 'Phone Number',
      latitude: -27.07,
      longitude: -49.48,
    })

    await gymsRepository.create({
      title: "João's Gym",
      description: 'The second best gym of your neighborhood',
      phone: 'Phone Number',
      latitude: -27.07,
      longitude: -49.48,
    })

    const { gyms } = await sut.exec({
      query: 'Moreno',
      page: 1,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Moreno's Gym" })])
  })

  it('should be able to search a paginated gym', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Moreno's Gym ${i}`,
        description: 'The best gym of your neighborhood',
        phone: 'Phone Number',
        latitude: -27.07,
        longitude: -49.48,
      })
    }

    const { gyms } = await sut.exec({
      query: 'Moreno',
      page: 2,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Moreno's Gym 21" }),
      expect.objectContaining({ title: "Moreno's Gym 22" }),
    ])
  })
})
