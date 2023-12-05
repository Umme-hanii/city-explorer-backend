import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../errors/custom-error'

export const errorHandlerMiddleware = (
  err: CustomApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal Server error',
  })
}
