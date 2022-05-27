import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";
import * as gitTag from "@schemas/gitTag";
import * as gitRelease from "@schemas/gitRelease";
import * as gitIssue from "@schemas/gitIssue";

export const parseBodyEvent = (eventBody: any) => {

  const eventMap = {
    isPush: (eventBody as gitPush.IncomingType)?.ref && (eventBody as gitPush.IncomingType)?.ref
      .startsWith("refs/heads/"),
    isPullRequest: (eventBody as gitPR.IncomingType)?.pull_request !== undefined,
    isTag: (eventBody as gitTag.IncomingType)?.ref && (eventBody as gitTag.IncomingType)?.ref
      .startsWith("refs/tags/")
  };

  console.debug("Event Map:", eventMap);

  if (eventMap.isPush) {
    return parsePush(eventBody);
  } else if (eventMap.isPullRequest) {
    return parsePullRequest(eventBody);
  } else if (eventMap.isTag) {
    return parseTag(eventBody);
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
    reviewers: pull_request.requested_reviewers.map((reviewer) => ({
      login: reviewer.login,
      id: String(reviewer.id),
    })),
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
