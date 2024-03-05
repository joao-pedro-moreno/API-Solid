import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrealdyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.exec({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() => sut.exec({
      name: 'John Doe',
      email,
      password: '123456',
    })).rejects.toBeInstanceOf(UserAlrealdyExistsError)
  })
})
