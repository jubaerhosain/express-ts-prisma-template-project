import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { setupSwagger } from "./swagger/setup.swagger";
import { GlobalExceptionFilter } from "./exception-filters/global.exception-filter";
import { RequestDtoValidationPipe } from "./pipes/request-dto-validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI,
  });

  app.setGlobalPrefix("api");

  setupSwagger(app);

  app.useGlobalPipes(new RequestDtoValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Campus Trade API is running on port ${port}...`);
  console.log(`API Documentation: http://localhost:${port}`);
}

bootstrap();
