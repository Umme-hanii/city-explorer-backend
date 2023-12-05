import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getAllCities, getCity } from '../api/controllers/cityController'
import { BadRequest } from '../api/errors/bad-request'
import { NotFound } from '../api/errors/not-found'
import * as utilsModule from '../api/shared/utils'

describe('City Controllers', () => {
  describe('getAllCities', () => {
    it('should return all cities', async () => {
      const mockCitiesData = { cities: [{ name: 'City1' }, { name: 'City2' }] }
      const getDataSpy = jest
        .spyOn(utilsModule, 'getData')
        .mockResolvedValueOnce(mockCitiesData)
      const jsonMock = jest.fn()
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: jsonMock }),
      } as unknown as Response

      await getAllCities({} as Request, res)

      expect(getDataSpy).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
      expect(jsonMock).toHaveBeenCalledWith(mockCitiesData)

      getDataSpy.mockRestore()
    })
  })

  describe('getCity', () => {
    it('should return a specific city', async () => {
      const mockCitiesData = {
        cities: [{ name: 'Sydney' }, { name: 'Melbourne' }],
      }
      const getDataSpy = jest
        .spyOn(utilsModule, 'getData')
        .mockResolvedValueOnce(mockCitiesData)
      const jsonMock = jest.fn()
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: jsonMock }),
      } as unknown as Response

      await getCity({ query: { name: 'Sydney' } } as unknown as Request, res)

      expect(getDataSpy).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
      expect(jsonMock).toHaveBeenCalledWith({ name: 'Sydney' })

      getDataSpy.mockRestore()
    })

    it('should handle missing city name', async () => {
      const jsonMock = jest.fn()
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: jsonMock }),
      } as unknown as Response

      await expect(async () => {
        await getCity({ query: {} } as Request, res)
      }).rejects.toThrow(BadRequest)

      // expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      // expect(jsonMock).toHaveBeenCalledWith({
      //   success: false,
      //   message: 'Please provide city name',
      // })
    })

    it('should handle city not found', async () => {
      const jsonMock = jest.fn()
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: jsonMock }),
      } as unknown as Response

      await expect(async () => {
        await getCity(
          { query: { name: 'NonexistentCity' } } as unknown as Request,
          res
        )
      }).rejects.toThrow(NotFound)

      // expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      // expect(jsonMock).toHaveBeenCalledWith({
      //   success: false,
      //   message: 'City with requested name is not found',
      // })
    })
  })
})
