const schema = {
  type: "object",
  properties: {
    ref: { type: "string" },
    repository: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        full_name: { type: "string" },
        html_url: { type: "string" },
      },
      sender: {
        type: "object",
        properties: {
          login: { type: "string" },
          id: { type: "number" },
          avatar_url: { type: "string" },
        },
      },
    deleted: { type: "boolean" },
    }
  }, required: ["ref", "repository", "sender", "deleted"],
};

type IncomingType = {
  ref: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
  },
  sender: {
    login: string;
    id: number;
    avatar_url: string;
  }
  deleted: boolean;
};

type MessageType = {
  eventType: string;
  tagName: string;
  eventLink: string;
  repository: string;
  repositoryURL: string;
  actionResponsible: string;
  actionResponsibleID: string;
  actionResponsibleImage: string;
}

export { schema, IncomingType, MessageType };
