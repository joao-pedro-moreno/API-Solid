import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrealdyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const { user } = await registerUseCase.exec({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const { user } = await registerUseCase.exec({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.exec({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() => registerUseCase.exec({
      name: 'John Doe',
      email,
      password: '123456',
    })).rejects.toBeInstanceOf(UserAlrealdyExistsError)
  })
})
