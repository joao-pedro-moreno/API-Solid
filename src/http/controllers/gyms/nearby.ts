import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsBodySchema.parse(req.query)

  const fetchNearbyGymsService = makeFetchNearbyGymsService()

  const { gyms } = await fetchNearbyGymsService.exec({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send({
    gyms,
  })
}
