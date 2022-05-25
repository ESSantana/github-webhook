import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@helpers/apiGateway";
import { middyfy } from "@middlewares/lambda";
import { parseBodyEvent } from "@helpers/parseBodyEvent";

import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import { sendMessageToChannel } from "@services/slack";

const handler: ValidatedEventAPIGatewayProxyEvent<
  typeof gitPR.schema | typeof gitPush.schema
> = async (event) => {
  console.debug("Evento Original: ", event);
  const parsedEvent = parseBodyEvent(event.body);
  console.debug("Evento Parseado: ", parsedEvent);

  if (!parsedEvent) {
    return formatJSONResponse({
      response: "",
    });
  }

  const response = await sendMessageToChannel(parsedEvent);
  return formatJSONResponse({
    response,
  });
};

export const main = middyfy(handler);
