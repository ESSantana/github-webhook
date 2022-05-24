import { IncomingWebhook } from "@slack/webhook";
import { MessageAttachment } from "@slack/types";
import { parseDate } from "@utils/parse";

type EventMessage = {
  title: string;
  author: string;
  branch: string;
  forcedAction: boolean;
  repository: string;
  repositoryURL: string;
  eventLink: string;
  eventType: string;
  eventDate: string;
};

export const sendMessageToChannel = async (messageData: EventMessage) => {
  const messageToSend = createSlackMessage(messageData);
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
  await webhook.send({
    attachments: [messageToSend],
  });
  return messageToSend;
};

const createSlackMessage = (params: EventMessage) => {
  const message: MessageAttachment = {
    color: "#36a64f",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`@${params.author}\` ${params.eventType} to <${
            params.repositoryURL
          }|${params.repository}> on branch ${params.branch} at \`${parseDate(
            params.eventDate
          )}\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Description:* ${params.title}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Reviewers:* \n \`@person1\`, \`@person2\`, \`@person3\``,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `Click *<${params.eventLink}|HERE>* to see the ${params.eventType} \nMake your review soon as possible`,
          },
        ],
      },
    ],
  };
  return message;
};
