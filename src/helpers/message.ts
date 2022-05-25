import { MessageAttachment } from "@slack/types";
import { parseDate } from "@utils/parse";
import { Block, KnownBlock } from "@slack/types";
import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";

const baseFactory = (blocks: (Block | KnownBlock)[], color?: string) => {
  const message: MessageAttachment = {
    color: color ?? "#36a64f",
    blocks,
  };
  return message;
};

const blockFactory = (blockText: string[]) => {
  const blocks: Block[] = [];
  blockText.forEach((param) => {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: param,
      },
    } as Block);
  });

  return blocks;
};

export const push = (ps: gitPush.MessageType) => {
  const blocks = blockFactory([
    `\`@${ps.author}\` ${ps.eventType} to <${ps.repositoryURL}|${ps.repository
    }> on branch ${ps.branch} at \`${parseDate(ps.createdAt)}\``,
    `*Description:* ${ps.title}`,
    `Click *<${ps.eventLink}|HERE>* to see the ${ps.eventType}`,
  ]);
  return baseFactory(blocks);
};

export const pullRequest = (pr: gitPR.MessageType) => {
  const reviewers = pr.reviewers
    .map((reviewer) => `\`@${reviewer.login}\``)
    .join(", ");

  const shortDescription = pr.title.length > 50 ? pr.title.slice(0, 50) + "..." : pr.title;

  const blocks = blockFactory([
    `\`@${pr.actionResponsible}\` criou um ${pr.eventType} no \`${pr.baseRepoName}\` em ${parseDate(pr.createdAt)}`,
    `*Pull Request:* ${pr.headBranch} (HEAD) -> ${pr.baseBranch} (BASE)`,
    `*Description:* ${shortDescription}`,
    `*Reviewers:* ${reviewers}`,
    `Click *<${pr.eventLink}|HERE>* to see the ${pr.eventType} and review it A$AP`,
  ]);

  return baseFactory(blocks);
};
