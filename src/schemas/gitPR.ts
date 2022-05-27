type IncomingType = {
  action: string;
  pull_request: {
    url: string;
    state: string;
    title: string;
    body: string;
    created_at: string;
    merged_at: string;
    requested_reviewers: {
      login: string;
      id: number;
      node_id: string;
    }[];
    head: {
      ref: string;
      repo: {
        name: string;
      };
    };
    base: {
      ref: string;
      repo: {
        name: string;
      };
    };
  };
  sender: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
  };
};

type MessageType = {
  action: string;
  actionResponsible: string;
  actionResponsibleID: string;
  actionResponsibleImage: string;
  title: string;
  eventLink: string;
  actionState: string;
  createdAt: string;
  mergetAt: string;
  eventType: string;
  reviewers: string[];
  headBranch: string;
  baseBranch: string;
  baseRepoName: string;
};

export { IncomingType, MessageType };
