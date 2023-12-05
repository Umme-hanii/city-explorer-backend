import express from 'express'
import { router } from './api/routes/index'

const app = express()

app.use(express.json())
app.use('/api/', router)

app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
