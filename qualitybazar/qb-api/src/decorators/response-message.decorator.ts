import { SetMetadata } from "@nestjs/common";
import { RESPONSE_MESSAGE_DECORATOR } from "./constants";

export const ResponseMessage = (message: string, statusCode: number) =>
  SetMetadata(RESPONSE_MESSAGE_DECORATOR, { message, statusCode });
