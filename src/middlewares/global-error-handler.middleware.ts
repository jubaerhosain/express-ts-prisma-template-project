import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    } else {
        console.log("global");
        next();
    }
};
