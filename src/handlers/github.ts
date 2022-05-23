import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { pushEvent } from "@schemas/github";
import { sendMessageToChannel } from "@utils/slack";

const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const response = await sendMessageToChannel();
  console.log(response);
  return formatJSONResponse({
    response,
  });
};

export const main = middyfy(handler);
