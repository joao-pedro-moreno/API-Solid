import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: "gym-01",
      title: "Moreno's Gym",
      description: "The best gym of your neighborhood",
      phone: "",
      latitude: new Decimal(-27.07),
      longitude: new Decimal(-49.48),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.exec({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.07,
      userLongitude: -49.48,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should be not able to check in twice on the same day", async () => {
    vi.setSystemTime(new Date(2021, 10, 4, 8, 0, 0)) // 04/11/2021 - 08:00:00

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.07,
      userLongitude: -49.48,
    })

    await expect(() => sut.exec({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.07,
      userLongitude: -49.48,
    })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but on different days", async () => {
    vi.setSystemTime(new Date(2021, 10, 4, 8, 0, 0)) // 04/11/2021 - 08:00:00

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.07,
      userLongitude: -49.48,
    })

    vi.setSystemTime(new Date(2021, 10, 5, 8, 0, 0)) // 05/11/2021 - 08:00:00

    const { checkIn } = await sut.exec({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.07,
      userLongitude: -49.48,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Moreno's Gym 2",
      description: "The second best gym of your neighborhood",
      phone: "",
      latitude: new Decimal(-27.07),
      longitude: new Decimal(-49.48),
    })

    await expect(() => sut.exec({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -27.20,
      userLongitude: -49.64,
    })).rejects.toBeInstanceOf(Error)
  })
})
