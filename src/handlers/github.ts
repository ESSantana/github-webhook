import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@helpers/apiGateway";
import { middyfy } from "@middlewares/lambda";
import { parseBodyEvent } from "@helpers/parseBodyEvent";
import { sendMessageToChannel } from "@services/slack";
import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import * as gitTag from "@schemas/gitTag";

import { StatusCodes } from "http-status-codes";

const handler: ValidatedEventAPIGatewayProxyEvent<
  typeof gitPR.schema | typeof gitPush.schema | typeof gitTag.schema
> = async (event) => {
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
