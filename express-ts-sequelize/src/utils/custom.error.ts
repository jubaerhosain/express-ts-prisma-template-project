export class HttpError extends Error {
    constructor(message: string | object, statusCode?: number) {
        super("An error occured");
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode ? statusCode : 400;
    }
}
