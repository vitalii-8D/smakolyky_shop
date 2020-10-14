export class ErrorHandler extends Error{
  name = 'Controller error';
  status: number;
  message: string;
  code?: number;

  constructor(status: number, msg: string, code?: number) {
    super(msg);
    this.status = status;
    this.message = msg;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
