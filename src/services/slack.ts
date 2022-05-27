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
      return msgFactory.push;
    case "pull request":
      return msgFactory.pullRequest;
    case "tag":
      return msgFactory.tag;
    case "release":
      return msgFactory.release;
    case "issue":
      return msgFactory.issue;
    default:
      throw new Error("Event not mapped!");
  }
};
