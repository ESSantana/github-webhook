import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";

export const parseBodyEvent = (eventBody: any) => {
  if ((eventBody as gitPush.IncomingType)?.head_commit) {
    return pushEvent(eventBody);
  } else if ((eventBody as gitPR.IncomingType)?.pull_request) {
    return pullRequestEvent(eventBody);
  } else {
    return undefined;
  }
};

const pushEvent = (eventBody: gitPush.IncomingType) => {
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

  return parsedBody as gitPush.MessageType;
};

const pullRequestEvent = (eventBody: gitPR.IncomingType) => {
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
      .replace(/api\.|repos\//, "")
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

  return parsedBody as gitPR.MessageType;
};
