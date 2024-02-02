import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const validateDto = (dtoType: any, location: "body" | "query" | "params"): RequestHandler => {
    return async (req, res, next) => {
        try {
            const dtoObj = plainToInstance(dtoType, req[location]);

            const errors: ValidationError[] = await validate(dtoObj, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });

            if (errors.length > 0) {
                const validationErrors: { [key: string]: string } = {};

                errors.forEach((error: ValidationError) => {
                    Object.keys(error.constraints || {}).forEach((key) => {
                        if (!validationErrors[error.property]) {
                            validationErrors[error.property] = error?.constraints?.[key] || "Invalid data";
                        }
                    });
                });

                res.status(400).json(validationErrors);
            } else {
                next();
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
};
