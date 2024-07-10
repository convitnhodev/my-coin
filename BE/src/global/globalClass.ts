export class ResponseData<D> {
  data: D | D[];
  statusCode: number;
  message: string;
  logs: string;

  constructor(
    data: D | D[],
    statusCode: number,
    message: string,
    logs: string,
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.logs = logs;

    return this;
  }
}
