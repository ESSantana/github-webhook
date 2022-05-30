import { gitPush, gitPR, gitTag, gitRelease, gitIssue } from "@schemas/index";

export type TMessage = gitPush.MessageType | gitPR.MessageType | gitTag.MessageType | gitRelease.MessageType | gitIssue.MessageType;
