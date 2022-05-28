import { MessageAttachment, Block, KnownBlock } from "@slack/types";
import { parseDate } from "@utils/parse";
import { gitPush, gitPR, gitTag, gitRelease, gitIssue } from "@schemas/index";

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
    `\`@${ps.author}\` fez um push para <${ps.repositoryURL}|${ps.repository}> na branch \`${ps.branch}\` em ${parseDate(ps.createdAt)}`,
    `*Descrição:* ${ps.title}`,
    `Clique *<${ps.eventLink}|AQUI>* para ver o evento`,
  ]);
  return messageFactory(blocks);
};

export const pullRequest = (pr: gitPR.MessageType) => {
  const reviewers = pr.reviewers.join(", ");;

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

export const tag = (tag: gitTag.MessageType) => {
  const blocks = blockFactory([
    `\`@${tag.actionResponsible}\` criou a tag \`${tag.tagName}\` em <${tag.repositoryURL}|${tag.repository}>`,
    `Clique *<${tag.eventLink}|AQUI>* para ver o evento`,
  ]);

  return messageFactory(blocks);
};

export const release = (rl: gitRelease.MessageType) => {
  const blocksText = [
    `\`@${rl.author}\` publicou a release \`${rl.releaseName}\` em <${rl.repositoryURL}|${rl.repository}> em ${parseDate(rl.publishedAt)}`,
    `*Descrição*: \n${rl.body}`,
    `Clique *<${rl.releaseURL}|AQUI>* para ver o evento`,
  ];

  if (rl.prerelease) {
    blocksText.push("Obs.: A release foi marcada como prerelease");
  }
  const blocks = blockFactory(blocksText);
  return messageFactory(blocks);
};

export const issue = (is: gitIssue.MessageType) => {
  const blocksText = [
    `\`@${is.issueCreator}\` ${is.action} uma issue em <${is.repositoryURL}|${is.repository}> em ${parseDate(is.createdAt)}`,
    `*Título*: ${is.issueTitle}`,
  ];

  if (is.labels.length > 0) {
    blocksText.push(`*Labels*: ${is.labels.join(", ")}`);
  }
  if (is.assignees.length > 0) {
    blocksText.push(`*Relacionado*: ${is.assignees.join(", ")}`);
  }
  blocksText.push(`Clique *<${is.issueURL}|AQUI>* para ver o evento`);

  const blocks = blockFactory(blocksText);
  return messageFactory(blocks);
};
