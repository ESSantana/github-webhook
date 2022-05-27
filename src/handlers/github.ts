import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@helpers/apiGateway";
import { middyfy } from "@middlewares/lambda";
import { parseBodyEvent } from "@helpers/parseBodyEvent";
import { sendMessageToChannel } from "@services/slack";

import { StatusCodes } from "http-status-codes";

const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const parsedEvent = parseBodyEvent(event.body);

  if (!parsedEvent) {
    return formatJSONResponse(StatusCodes.NO_CONTENT, {
      response: "",
    });
  }

  const response = await sendMessageToChannel(parsedEvent);
  return formatJSONResponse(StatusCodes.OK, {
    response,
  });
};

export const main = middyfy(handler);
