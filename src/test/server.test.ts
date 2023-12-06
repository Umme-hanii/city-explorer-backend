import request from 'supertest'
import express from 'express'
import { router } from '../api/routes/index'
import { notFound } from '../api/middleware/not-found'
import { errorHandlerMiddleware } from '../api/middleware/error-handler'

const app = express()

app.use(express.json())
app.use('/api/', router)
app.use(notFound)
app.use(errorHandlerMiddleware)

describe('Express App Tests', () => {
  it('should return 404 for an unknown route', async () => {
    const response = await request(app).get('/nonexistent-route')
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({
      message: 'Route does not exist',
      success: false,
    })
  })

  it('should return 200 and data for a known route', async () => {
    const response = await request(app).get('/api/cities?name=Sydney')
    expect(response.statusCode).toBe(200)
  })
})
