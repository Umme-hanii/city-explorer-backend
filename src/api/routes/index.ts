import express from 'express'
import { cityRouter } from './cityRoutes'

export const router = express.Router()
router.use('/cities', cityRouter)
