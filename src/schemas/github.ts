export const pushEvent = {
  type: "object",
  properties: {
    ref: { type: 'string' },
    repository: {
      type: 'object',
      properties: {
        url: { type: 'string' }
      }
    },
    pusher: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    forced: { type: 'boolean' },
    compare: { type: 'string' },
    head_commit: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        timestamp: { type: 'string' },
        url: { type: 'string' } 
      }
    }
  },
  required: ['ref', 'repository', 'pusher', 'forced', 'compare', 'head_commit']
};
