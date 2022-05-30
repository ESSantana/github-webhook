import * as msgFactory from "@helpers/slackMessageFactory";
import { gitPush, gitPR, gitTag, gitRelease, gitIssue } from "@schemas/index";
import { saveWebhookInfo } from "@data/slack";
import { SlackWebhookDB } from "@internal-types/slack";

import { IncomingWebhook, } from "@slack/webhook";

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

export const saveWebHookData = async (data: Partial<SlackWebhookDB>) => {
  const response = await saveWebhookInfo(data);
  return response;
}

