import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.status).json({
            message: err.message,
            data: err.data,
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
