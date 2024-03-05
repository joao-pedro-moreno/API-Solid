export class ResourceNotFoudError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
