import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Exec')

    return {
      async teardown() {
        console.log('Terminou')
      },
    }
  },
}
