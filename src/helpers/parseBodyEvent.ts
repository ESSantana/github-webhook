import * as gitPush from "@schemas/gitPush";
import * as gitPR from "@schemas/gitPR";

export const parseBodyEvent = (eventBody: any) => {
  if ((eventBody as gitPush.IncomingType)?.head_commit) {
    return pushEvent(eventBody);
  } else if ((eventBody as gitPR.IncomingType)?.pull_request) {
    return pullRequestEvent(eventBody);
  } else {
    throw new Error("Event not mapped!");
  }
};

const pushEvent = (eventBody: gitPush.IncomingType) => {
  const { compare, forced, head_commit, pusher, ref, repository } = eventBody;
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

  return parsedBody.action === "opened" ? parsedBody as gitPR.MessageType : undefined;
};
