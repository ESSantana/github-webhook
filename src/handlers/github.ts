import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import * as gitPush from "@schemas/gitPush";
import { sendMessageToChannel } from "@utils/slack";

const handler: ValidatedEventAPIGatewayProxyEvent<
  typeof gitPush.schema
> = async (event) => {
  const parsedEvent = parseEventBody(event.body);
  console.log(parsedEvent);

  const response = await sendMessageToChannel(parsedEvent);
  return formatJSONResponse({
    response,
  });
};

const parseEventBody = (eventBody: gitPush.Type) => {
  const { compare, forced, head_commit, pusher, ref, repository } = eventBody;
  const parsedBody = {
    title: head_commit.message,
    author: pusher.name,
    eventLink: compare,
    branch: ref.split("/")[2],
    forcedAction: forced,
    eventType: "Push",
    eventDate: head_commit.timestamp,
    repository: repository.name,
    repositoryURL: repository.url,
  };

  return parsedBody;
};

export const main = middyfy(handler);
