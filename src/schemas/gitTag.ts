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

export { IncomingType, MessageType };
