const schema = {
  type: "object",
  properties: {
    action: { type: "string" },
    issue: {
      type: "object",
      properties: {
        html_url: { type: "string" },
        id: { type: "number" },
        title: { type: "string" },
        user: {
          type: "object",
          properties: {
            login: { type: "string" },
            id: { type: "number" },
            avatar_url: { type: "string" },
          }
        },
        labels: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            }
          }
        },
        state: { type: "string" },
        assignees: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              login: { type: "string" },
              avatar_url: { type: "string" },
            }
          }
        },
        created_at: { type: "string" },
        closed_at: { type: "string" },
        body: { type: "string" },
      },
    },
    repository: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        html_url: { type: "string" },
      },
    },
  },
  require: ["action", "issue", "repository"],
};

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
  issueURL: string,
  issueTitle: string,
  issueBody: string,
  issueCreator: string,
  issueCreatorID: string,
  issueCreatorImage: string,
  labels: {
    name: string,
  }[],
  state: string,
  assignees: {
    login: string,
  }[],
  createdAt: string,
  repository: string,
  repositoryURL: string,
}

export { schema, IncomingType, MessageType };
