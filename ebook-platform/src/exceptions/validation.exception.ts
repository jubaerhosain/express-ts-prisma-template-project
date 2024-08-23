import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const ValidationExceptionFactory = (errors: ValidationError[]) => {
    // Including nested errors
    const formatError = (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((error: ValidationError) => {
            errMsg[error.property] = error.children?.length
                ? [formatError(error.children)]
                : [...Object.values(error.constraints)];
        });
        return errMsg;
    };
    return new BadRequestException(formatError(errors));
};
