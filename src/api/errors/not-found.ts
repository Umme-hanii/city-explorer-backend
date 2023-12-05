import { CustomApiError } from './custom-error'
import { StatusCodes } from 'http-status-codes'

export class NotFound extends CustomApiError {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
