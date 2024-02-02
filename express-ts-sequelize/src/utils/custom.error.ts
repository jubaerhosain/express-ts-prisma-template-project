export class CustomError extends Error {
    status: number;
    data?: object;
    constructor(message: string, status: number, data?: object) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}
