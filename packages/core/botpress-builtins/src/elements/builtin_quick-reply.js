export default {
  id: 'builtin_quick-reply',
  renderer: '#builtin_quick-reply',

  group: 'Built-in Messages',
  title: 'Quick Reply',

  jsonSchema: {
    description: 'A one-click user reply, used with Single Choice',
    type: 'object',
    required: ['action'],
    properties: {
      action: {
        type: 'string',
        enum: ['Text reply', 'Send Location', 'Send Email', 'Send Phone'],
        default: 'Text reply'
      }
    },
    dependencies: {
      action: {
        oneOf: [
          {
            properties: {
              action: {
                enum: ['Send Location', 'Send Email', 'Send Phone']
              }
            }
          },
          {
            properties: {
              action: {
                enum: ['Text reply']
              },
              label: {
                type: 'string',
                description: 'Quick Reply label seen by user'
              },
              reply: {
                type: 'string',
                title: 'Reply that user sends when clicking the button'
              }
            },
            required: ['reply']
          }
        ]
      }
    }
  },

  uiSchema: {},

  computePreviewText: formData => `Action: ${formData.action}`,

  computeMetadata: null
}
