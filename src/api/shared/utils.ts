import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

export const getData = async () => {
  const data = await readFileAsync('src/api/assets/data/cities.json', 'utf-8')
  if (data) {
    return JSON.parse(data)
  }
}
