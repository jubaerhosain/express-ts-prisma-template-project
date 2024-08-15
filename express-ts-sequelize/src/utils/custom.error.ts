export class CustomError extends Error {
    errorMessage: string | object;
    statusCode: number;
    constructor(message: string | object, statusCode?: number) {
        super("An error occured");
        this.name = this.constructor.name;
        this.errorMessage = message;
        this.statusCode = statusCode ? statusCode : 400;
    }
}
