import { IncomingWebhook } from "@slack/webhook";
import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import * as msgFactory from "src/helpers/message";

export const sendMessageToChannel = async (
  messageData: gitPush.MessageType | gitPR.MessageType
) => {
  const messageFactory = selectMessageFactory(messageData.eventType);

  const message = messageFactory(messageData as any);
  console.debug("Mensagem criada: ", message);
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
    default:
      console.debug("Event not mapped!");
      throw new Error("Event not mapped!");
  }
};
