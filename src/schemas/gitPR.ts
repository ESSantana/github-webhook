const schema = {
  type: "object",
  properties: {
    action: { type: "string" },
    pull_request: {
      type: "object",
      properties: {
        url: { type: "string" },
        state: { type: "string" },
        title: { type: "string" },
        body: { type: "string" },
        created_at: { type: "string" },
        merged_at: { type: "string" },
        requested_reviewers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              login: { type: "string" },
              id: { type: "number" },
              node_id: { type: "string" },
            },
          },
        },
        head: {
          type: "object",
          properties: {
            ref: { type: "string" },
            repo: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
            },
          },
        },
        base: {
          type: "object",
          properties: {
            ref: { type: "string" },
            repo: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    sender: {
      type: "object",
      properties: {
        login: { type: "string" },
        id: { type: "number" },
        node_id: { type: "string" },
        avatar_url: { type: "string" },
      },
    },
  },
  required: ["action", "pull_request", "sender"],
};

type Type = {
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

export { schema, Type };
