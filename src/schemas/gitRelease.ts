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
  prerelease: boolean;
  publishedAt: string;
  body: string;
  repository: string;
  repositoryURL: string;
  author: string;
  authorID: string;
  authorImage: string;
}

export { IncomingType, MessageType };
