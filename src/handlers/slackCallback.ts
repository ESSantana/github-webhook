import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@helpers/apiGateway";
import { middyfy } from "@middlewares/lambda";
import { StatusCodes } from "http-status-codes";
import { saveWebHookData } from "@services/slack";
import moment from "moment";

const handler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const body = event.body as { webhook_url: string };
  const webhookUrl = body.webhook_url;
  console.log("Body: ", body);
  const response = await saveWebHookData({
    webhookUrl,
    createdAt: moment().format(),
  });
  console.log("Response: ", response)
  return formatJSONResponse(StatusCodes.OK, {
    response: JSON.stringify(response),
  });
};

export const main = middyfy(handler);
