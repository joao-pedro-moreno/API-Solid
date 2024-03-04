import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    // SUT => System under test
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: "John Doe",
      email: 'johndoe@example.com',
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.exec({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    // SUT => System under test
    const sut = new AuthenticateService(usersRepository)

    await expect(() => sut.exec({
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    // SUT => System under test
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: "John Doe",
      email: 'johndoe@example.com',
      password_hash: await hash("123456", 6),
    })

    await expect(() => sut.exec({
      email: 'johndoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
