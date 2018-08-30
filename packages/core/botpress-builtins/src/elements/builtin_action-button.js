export default {
  id: 'builtin_action-button',
  renderer: '#builtin_action-button',

  group: 'Built-in Messages',
  title: 'Action Button',

  jsonSchema: {
    description: 'A button that triggers an action, often used in cards',
    type: 'object',
    required: ['action', 'title'],
    properties: {
      title: {
        type: 'string',
        description: 'Title of the button'
      },
      action: {
        type: 'string',
        enum: ['Say something', 'Open URL', 'Click-to-Call', 'Pick location'],
        default: 'Say something'
      }
    },
    dependencies: {
      action: {
        oneOf: [
          {
            properties: {
              action: {
                enum: ['Say something', 'Pick location']
              }
            }
          },
          {
            properties: {
              action: {
                enum: ['Open URL']
              },
              url: {
                type: 'string',
                title: 'Enter a valid URL'
              },
              webview_height_ratio: {
                type: 'string',
                title: 'Webview Height',
                enum: ['compact', 'tall', 'full'],
                default: 'tall'
              },
              messenger_extensions: {
                type: 'boolean',
                title: 'Messenger Extensions',
                default: true
              }
            },
            required: ['url']
          },
          {
            properties: {
              action: {
                enum: ['Click-to-Call']
              },
              phone_number: {
                type: 'string',
                title: 'Enter a valid Phone Number'
              }
            },
            required: ['phone_number']
          }
        ]
      }
    }
  },

  uiSchema: {
    items: {
      phone_number: {
        'ui:help': 'Include "+" prefix, country code, area code and local number: +16505551234'
      }
    }
  },

  computePreviewText: formData => `Action: ${formData.action}`,

  computeMetadata: null
}
