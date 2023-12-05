import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

export const getData = async () => {
  try {
    const data = await readFileAsync('src/api/assets/data/cities.json', 'utf-8')
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading or parsing data:', error)
  }
}
