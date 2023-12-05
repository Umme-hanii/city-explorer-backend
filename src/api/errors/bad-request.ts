import { CustomApiError } from './custom-error'
import { StatusCodes } from 'http-status-codes'

export class BadRequest extends CustomApiError {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
