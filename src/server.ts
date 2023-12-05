import express from 'express'
import cors from 'cors'
import { router } from './api/routes/index'
import { notFound } from './api/middleware/not-found'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/', router)

app.use(notFound)

app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
