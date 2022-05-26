import { MessageAttachment, Block, KnownBlock } from "@slack/types";
import { parseDate } from "@utils/parse";
import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";

const messageFactory = (blocks: (Block | KnownBlock)[], color?: string) => {
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
    `\`@${ps.author}\` fez um push para <${ps.repositoryURL}|${ps.repository
    }> na branch \`${ps.branch}\` em ${parseDate(ps.createdAt)}`,
    `*Descrição:* ${ps.title}`,
    `Clique *<${ps.eventLink}|AQUI>* para ver o evento`,
  ]);
  return messageFactory(blocks);
};

export const pullRequest = (pr: gitPR.MessageType) => {
  const reviewers = pr.reviewers
    .map((reviewer) => `\`@${reviewer.login}\``)
    .join(", ");

  const shortDescription = pr.title.length > 50 ? pr.title.slice(0, 50) + "..." : pr.title;

  const blocks = blockFactory([
    `\`@${pr.actionResponsible}\` fez um pull request para \`${pr.baseRepoName}\` em ${parseDate(pr.createdAt)}`,
    `*Pull Request:* ${pr.headBranch} (HEAD) -> ${pr.baseBranch} (BASE)`,
    `*Descrição:* ${shortDescription}`,
    `*Revisores:* ${reviewers}`,
    `Clique *<${pr.eventLink}|AQUI>* para ver o evento e revisar o mais rápido possível`,
  ]);

  return messageFactory(blocks);
};
