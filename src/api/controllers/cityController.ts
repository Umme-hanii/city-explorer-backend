import { Request, Response } from 'express'
import { readFile } from 'fs'
import { promisify } from 'util'
import { CityInterface } from '../types/city.interface'

const readFileAsync = promisify(readFile)

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const data = await readFileAsync('src/api/assets/data/cities.json', 'utf-8')
    const citiesData: { cities: CityInterface[] } = JSON.parse(data)

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

    const data = await readFileAsync('src/api/assets/data/cities.json', 'utf-8')
    const citiesData: { cities: CityInterface[] } = JSON.parse(data)
    const city: CityInterface | undefined = citiesData.cities.find(
      (city) => city.name === requestedCityName
    )
    if (!city) {
      return res.status(404).send('Requested city is not found')
    }
    return res.status(200).send(city)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
