import { IncomingWebhook } from "@slack/webhook";
import { MessageAttachment } from "@slack/types";

export const sendMessageToChannel = async () => {
  const messageToSend = createSlackMessage({
    author: "esantana",
    eventType: "Pull Request",
    eventLink: "https://github.com",
    repo: "Mock Repository",
    repoLink: "https://github.com",
    title: "First commit",
    timestamp: 1653265656,
  });
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
  await webhook.send({
    attachments: [messageToSend],
  });
  return messageToSend;
};

type eventMessage = {
  title: string;
  author: string;
  repo: string;
  repoLink: string;
  eventLink: string;
  eventType: string;
  timestamp: number;
};

const createSlackMessage = (params: eventMessage) => {
  const message: MessageAttachment = {
    color: "#36a64f",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`@${params.author}\` ${params.eventType} to <${
            params.repoLink
          }|${params.repo}> at \`${parseDate(params.timestamp)}\``,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Description: ${params.title}`,
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
            text: `See the *<${params.eventLink}|${params.eventType}>* and make your review soon as possible`,
          },
        ],
      },
    ],
  };
  return message;
};

const parseDate = (source: number): string =>
  new Date(source).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
