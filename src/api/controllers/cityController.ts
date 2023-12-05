import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { BadRequest } from '../errors/bad-request'
import { CityInterface } from '../types/city.interface'
import { getData } from '../shared/utils'
import { NotFound } from '../errors/not-found'

export const getAllCities = async (req: Request, res: Response) => {
  const citiesData: { cities: CityInterface[] } = await getData()
  return res.status(StatusCodes.OK).json(citiesData)
}

export const getCity = async (req: Request, res: Response) => {
  const requestedCityName = req.query.name as string
  if (!requestedCityName) {
    throw new BadRequest('Please provide city name')
  }

  const citiesData = await getData()
  const city: CityInterface = citiesData.cities.find(
    (city: CityInterface) =>
      city.name.toLowerCase() === requestedCityName.toLowerCase()
  )
  if (!city) {
    throw new NotFound('City with requested name is not found')
  }
  return res.status(StatusCodes.OK).json(city)
}
