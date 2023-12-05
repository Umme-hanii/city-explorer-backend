import { Request, Response } from 'express'
import { getData } from '../shared/utils'
import { CityInterface } from '../types/city.interface'

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const citiesData: { cities: CityInterface[] } = await getData()
    return res.status(200).json(citiesData.cities)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getCity = async (req: Request, res: Response) => {
  try {
    const requestedCityName = req.query.name as string
    if (!requestedCityName) {
      return res
        .status(400)
        .send('City name is missing from the query parameters')
    }

    const citiesData = await getData()
    const city: CityInterface = citiesData.cities.find(
      (city: CityInterface) =>
        city.name.toLowerCase() === requestedCityName.toLowerCase()
    )
    if (!city) {
      return res.status(404).send('Requested city is not found')
    }
    return res.status(200).json(city)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
