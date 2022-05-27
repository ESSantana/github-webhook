import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import * as gitTag from "@schemas/gitTag";
import * as gitRelease from "@schemas/gitRelease";
import * as gitIssue from "@schemas/gitIssue";

type TMessage = gitPush.MessageType | gitPR.MessageType | gitTag.MessageType | gitRelease.MessageType | gitIssue.MessageType;

export const parseBodyEvent = (eventBody: any): TMessage => {
  const eventMap = {
    isPush: (eventBody as gitPush.IncomingType)?.ref && (eventBody as gitPush.IncomingType)?.ref
      .startsWith("refs/heads/"),
    isPullRequest: (eventBody as gitPR.IncomingType)?.pull_request !== undefined,
    isTag: (eventBody as gitTag.IncomingType)?.ref && (eventBody as gitTag.IncomingType)?.ref
      .startsWith("refs/tags/"),
    isRelease: (eventBody as gitRelease.IncomingType)?.release !== undefined,
    isIssue: (eventBody as gitIssue.IncomingType)?.issue !== undefined,
  };

  console.debug("Event Map:", eventMap);

  if (eventMap.isPush) {
    return parsePush(eventBody);
  } else if (eventMap.isPullRequest) {
    return parsePullRequest(eventBody);
  } else if (eventMap.isTag) {
    return parseTag(eventBody);
  } else if (eventMap.isRelease) {
    return parseRelease(eventBody);
  } else if (eventMap.isIssue) {
    return parseIssue(eventBody);
  } else {
    return undefined;
  }
};

const parsePush = (eventBody: gitPush.IncomingType): gitPush.MessageType => {
  const { compare, forced, head_commit, pusher, ref, repository } = eventBody;

  const isMainBranch = ["refs/heads/main", "refs/heads/master"].includes(ref);
  if (!isMainBranch) {
    return undefined;
  }

  const parsedBody = {
    title: head_commit.message,
    author: pusher.name,
    eventLink: compare,
    branch: ref.split("/")[2],
    forcedAction: forced,
    eventType: "push",
    createdAt: head_commit.timestamp,
    repository: repository.name,
    repositoryURL: repository.url,
  };

  return parsedBody;
};

const parsePullRequest = (eventBody: gitPR.IncomingType): gitPR.MessageType => {
  const { action, pull_request, sender } = eventBody;

  const isPullRequestCreation = ["opened", "reopened"].includes(action);

  if (!isPullRequestCreation) {
    return undefined;
  }

  const parsedBody = {
    action,
    actionResponsible: sender.login,
    actionResponsibleID: String(sender.id),
    actionResponsibleImage: sender.avatar_url,
    title: pull_request.title,
    eventLink: pull_request.url
      .replace(/api\.|repos\//g, "")
      .replace("pulls", "pull"),
    actionState: pull_request.state,
    createdAt: pull_request.created_at,
    mergetAt: pull_request.merged_at,
    eventType: "pull request",
    reviewers: pull_request.requested_reviewers.map((reviewer) =>`\`@${reviewer.login}\``),
    headBranch: pull_request.head.ref,
    baseBranch: pull_request.base.ref,
    baseRepoName: pull_request.base.repo.name,
  };

  return parsedBody;
};

const parseTag = (eventBody: gitTag.IncomingType): gitTag.MessageType => {
  const { ref, repository, sender, deleted } = eventBody;

  if (deleted) {
    return undefined;
  }

  function createTagURL(repoFullName: string, tagName: string) {
    return `https://github.com/${repoFullName}/tree/${tagName}`
  }

  const tagName = ref.split("/").pop() ?? "";
  const parsedBody = {
    eventType: "tag",
    tagName: tagName,
    eventLink: createTagURL(repository.full_name, tagName),
    repository: repository.name,
    repositoryURL: repository.html_url,
    actionResponsible: sender.login,
    actionResponsibleID: String(sender.id),
    actionResponsibleImage: sender.avatar_url,
  }

  return parsedBody;
}


const parseRelease = (eventBody: gitRelease.IncomingType): gitRelease.MessageType => {
  const { action, release, repository } = eventBody;

  if (action != "published") {
    return undefined;
  }

  const parsedBody = {
    eventType: "release",
    releaseName: release.name,
    releaseURL: release.html_url,
    prerelease: release.prerelease,
    publishedAt: release.published_at,
    body: release.body,
    repository: repository.name,
    repositoryURL: repository.html_url,
    author: release.author.login,
    authorID: String(release.author.id),
    authorImage: release.author.avatar_url,
  }

  return parsedBody;
}

const parseIssue = (eventBody: gitIssue.IncomingType): gitIssue.MessageType => {
  const { action, issue, repository } = eventBody;

  if (action !== "opened" && action !== "reopened" && action !== "closed") {
    return undefined;
  }

  const actionMap = { opened: "abriu", reopened: "reabriu", closed: "fechou" };

  const parsedBody = {
    eventType: "issue",
    action: actionMap[action],
    issueURL: issue.html_url,
    issueTitle: issue.title,
    issueBody: issue.body,
    issueCreator: issue.user.login,
    issueCreatorID: String(issue.user.id),
    issueCreatorImage: issue.user.avatar_url,
    labels: issue.labels.map((label) => `\`${label.name}\``),
    state: issue.state,
    assignees: issue.assignees.map((assignee) => `\`@${assignee.login}\``),
    createdAt: issue.created_at,
    repository: repository.name,
    repositoryURL: repository.html_url,
  }

  return parsedBody;
}
