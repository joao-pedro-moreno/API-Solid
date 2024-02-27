export class UserAlrealdyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
