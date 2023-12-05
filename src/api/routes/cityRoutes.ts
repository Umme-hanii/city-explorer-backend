import express from 'express'
import { getAllCities, getCity } from '../controllers/cityController'

export const cityRouter = express.Router()

cityRouter.route('/all').get(getAllCities)
cityRouter.route('/').get(getCity)
