import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Moreno's Gym",
        description: 'The best gym of your neighborhood',
        phone: 'Phone Number',
        latitude: -27.07,
        longitude: -49.48,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "João's Gym",
        description: 'The best gym of your neighborhood',
        phone: 'Phone Number',
        latitude: -27.07,
        longitude: -49.48,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'Moreno' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Moreno's Gym",
      }),
    ])
  })
})
