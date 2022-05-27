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

export { IncomingType, MessageType };
