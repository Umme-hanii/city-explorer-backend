import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './api/routes/index'
import { notFound } from './api/middleware/not-found'
import { errorHandlerMiddleware } from './api/middleware/error-handler'

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use('/api/', router)

app.use(notFound)
app.use(errorHandlerMiddleware)

app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
