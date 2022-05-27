import * as msgFactory from "@helpers/slackMessageFactory";
import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import * as gitTag from "@schemas/gitTag";
import * as gitRelease from "@schemas/gitRelease";
import * as gitIssue from "@schemas/gitIssue";

import { IncomingWebhook } from "@slack/webhook";

export const sendMessageToChannel = async (
  messageData: gitPush.MessageType | gitPR.MessageType | gitTag.MessageType
    | gitRelease.MessageType | gitIssue.MessageType
) => {
  const messageFactory = selectMessageFactory(messageData.eventType);
  const message = messageFactory(messageData as any);
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
  await webhook.send({
    attachments: [message],
  });
  return message;
};

const selectMessageFactory = (event: string) => {
  switch (event) {
    case "push":
      console.debug("push factory");
      return msgFactory.push;
    case "pull request":
      console.debug("pull request factory");
      return msgFactory.pullRequest;
    case "tag":
      console.debug("tag factory");
      return msgFactory.tag;
    case "release":
      console.debug("release factory");
      throw new Error("not implemented");
    case "issue":
      console.debug("issue factory");
      throw new Error("not implemented");
    default:
      console.debug("Event not mapped!");
      throw new Error("Event not mapped!");
  }
};
