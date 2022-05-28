type IncomingType = {
  action: string,
  issue: {
    html_url: string,
    id: number,
    title: string,
    user: {
      login: string,
      id: number,
      avatar_url: string,
    },
    labels: {
      id: number,
      name: string,
    }[],
    state: string,
    assignees: {
      id: number,
      login: string,
      avatar_url: string,
    }[],
    created_at: string,
    closed_at: string,
    body: string,
  },
  repository: {
    id: number,
    name: string,
    html_url: string,
  },
};

type MessageType = {
  eventType: string;
  action: string;
  issueURL: string;
  issueTitle: string;
  issueBody: string;
  issueCreator: string;
  issueCreatorID: string;
  issueCreatorImage: string;
  labels: string[];
  state: string;
  assignees: string[];
  createdAt: string;
  repository: string;
  repositoryURL: string;
}

export { IncomingType, MessageType };
