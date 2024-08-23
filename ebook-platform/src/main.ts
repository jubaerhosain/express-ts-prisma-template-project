import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFactory } from './exceptions/validation.exception';
import * as cookieParser from 'cookie-parser';
import config from './config/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.use(cookieParser(config.cookie.secret));

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: ValidationExceptionFactory,
        }),
    );

    await app.listen(config.port);

    console.log(`App is listening on port ${config.port} ...`);
}

bootstrap();
