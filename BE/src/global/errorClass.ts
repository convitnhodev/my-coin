enum HttpStatus {
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

class AppError extends Error {
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
  logErrorResponse: string;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    logErrorResponse: string,
  ) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.isOperational = isOperational;
    this.logErrorResponse = logErrorResponse;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class APICustomError extends AppError {
  constructor(
    name: string,
    statusCode: number,
    description: string,
    message: string,
    isOperational: boolean,
  ) {
    super(name, statusCode, description, isOperational, message);
  }
}

// (Internal Server Error - 500)
class InternalServerError extends APICustomError {
  constructor(description: string, message: string) {
    super(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      description,
      message,
      true,
    );
  }
}

// (Bad Request - 400)
class BadRequestError extends APICustomError {
  constructor(description: string, message: string) {
    super('Bad Request', HttpStatus.BAD_REQUEST, description, message, true);
  }
}

// (Unauthorized - 401)
class UnauthorizeError extends AppError {
  constructor(description: string, message: string) {
    super('Unauthorized', HttpStatus.UNAUTHORIZED, description, true, message);
  }
}

class DBError extends APICustomError {
  constructor(description: string, message: string) {
    super('Database Error', HttpStatus.BAD_REQUEST, description, message, true);
  }
}

export {
  InternalServerError,
  APICustomError,
  BadRequestError,
  UnauthorizeError,
  DBError,
};
