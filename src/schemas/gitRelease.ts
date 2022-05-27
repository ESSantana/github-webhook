const schema = {
  type: "object",
  properties: {
    action: { type: "string" },
    release: {
      type: "object",
      properties: {
        html_url: { type: "string" },
        id: { type: "number" },
        author: {
          type: "object",
          properties: {
            login: { type: "string" },
            id: { type: "number" },
            avatar_url: { type: "string" },

          }
        },
        name: { type: "string" },
        prerelease: { type: "boolean" },
        published_at: { type: "string" },
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
  }, required: ["action", "release", "repository"],
};

type IncomingType = {
  action: string;
  release: {
    html_url: string;
    id: number;
    author: {
      login: string;
      id: number;
      avatar_url: string;
    },
    name: string;
    prerelease: boolean;
    published_at: string;
    body: string;
  },
  repository: {
    id: number;
    name: string;
    html_url: string;
  },
};

type MessageType = {
  eventType: string;
  releaseName: string;
  releaseURL: string;
  prerelease: string;
  publishedAt: string;
  body: string;
  repository: string;
  repositoryURL: string;
  author: string;
  authorID: string;
  authorImage: string;
}

export {schema, IncomingType, MessageType};
