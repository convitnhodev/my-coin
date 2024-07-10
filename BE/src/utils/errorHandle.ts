import {
  APICustomError,
  BadRequestError,
  DBError,
  InternalServerError,
  UnauthorizeError,
} from 'src/global/errorClass';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus } from 'src/global/globalEnum';

export function ErrorResponse(error: Error): ResponseData<any> {
  if (
    error instanceof DBError ||
    error instanceof APICustomError ||
    error instanceof UnauthorizeError ||
    error instanceof BadRequestError ||
    error instanceof InternalServerError
  ) {
    return new ResponseData(
      null,
      error.statusCode,
      error.message,
      error.logErrorResponse,
    );
  } else {
    return new ResponseData(
      null,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      error.message,
    );
  }
}
