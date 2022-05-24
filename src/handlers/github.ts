import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import { sendMessageToChannel } from "@utils/slack";

const handler: ValidatedEventAPIGatewayProxyEvent<
  typeof gitPR.schema | typeof gitPush.schema
> = async (event) => {
  console.log(event);
  const parsedEvent = parseEventBodyPR(event.body);

  // const parsedEvent = parseEventBody(event.body);
  console.log(parsedEvent);

  // const response = await sendMessageToChannel(parsedEvent);
  return formatJSONResponse({
    response: "OK",
  });
};

const parseEventBodyPush = (eventBody: gitPush.Type) => {
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

const parseEventBodyPR = (eventBody: gitPR.Type) => {
  const { action, pull_request, sender } = eventBody;
  const parsedBody = {
    action,
    actionResponsible: sender.login,
    actionResponsibleID: sender.id,
    actionResponsibleImage: sender.avatar_url,
    title: pull_request.title,
    description: pull_request.body,
    eventLink: pull_request.url.replace(/api\.|repos\//, "").replace("pulls", "pull"),
    actionState: pull_request.state,
    createdAt: pull_request.created_at,
    mergetAt: pull_request.merged_at,
    eventType: "Pull Request",
    reviewers: pull_request.requested_reviewers.map((reviewer) => ({
      login: reviewer.login,
      id: reviewer.id,
    })),
    headBranch: pull_request.head.ref,
    baseBranch: pull_request.base.ref,
  };

  return parsedBody;
};

export const main = middyfy(handler);
