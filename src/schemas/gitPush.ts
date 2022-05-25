const schema = {
  type: "object",
  properties: {
    ref: { type: "string" },
    repository: {
      type: "object",
      properties: {
        url: { type: "string" },
        name: { type: "string" },
      },
    },
    pusher: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    },
    forced: { type: "boolean" },
    compare: { type: "string" },
    head_commit: {
      type: "object",
      properties: {
        message: { type: "string" },
        timestamp: { type: "string" },
        url: { type: "string" },
      },
    },
  },
  required: ["ref", "repository", "pusher", "forced", "compare", "head_commit"],
};

type IncomingType = {
  ref: string;
  repository: {
    url: string;
    name: string;
  };
  pusher: {
    name: string;
    email: string;
  };
  forced: boolean;
  compare: string;
  head_commit: {
    message: string;
    timestamp: string;
    url: string;
  };
};

type MessageType = {
  title: string;
  author: string;
  branch: string;
  forcedAction: boolean;
  repository: string;
  repositoryURL: string;
  eventLink: string;
  eventType: string;
  createdAt: string;
};

export { schema, IncomingType, MessageType };
