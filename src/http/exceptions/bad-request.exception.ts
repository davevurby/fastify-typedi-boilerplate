export class BadRequestException extends Error {
  constructor(message?: string | string[]) {
    super(Array.isArray(message) ? message.join('|---|') : message);
  }

  readonly statusCode = 400;
}
