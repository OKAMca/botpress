// TODO
// Add buttons support to Telegram

import url from 'url'

const SKIP_CHOICE_PREFIX = /^!skip |^!hide |^!hidden /i

const takeVisible = choices => {
  return (choices || []).filter(c => !SKIP_CHOICE_PREFIX.test(c.reply) && !SKIP_CHOICE_PREFIX.test(c.label))
}

export default data => [
  {
    on: 'facebook',
    text: data.text,
    quick_replies: takeVisible(data.choices).map(c => `<${c.reply || c.action}> ${c.label || c.action}`),
    typing: data.typing
  },
  {
    on: 'webchat',
    text: data.text,
    quick_replies: takeVisible(data.choices).map(c => `<${c.reply}> ${c.label}`),
    typing: data.typing
  },
  {
    on: 'microsoft',
    type: 'message',
    text: data.text,
    inputHint: 'expectingInput',
    suggestedActions: {
      actions: takeVisible(data.choices).map(c => ({
        type: 'imBack',
        label: c.label,
        reply: c.reply
      }))
    }
  },
  {
    on: 'slack',
    attachments: [
      {
        text: data.text,
        attachment_type: 'default',
        actions: takeVisible(data.choices).map(c => ({
          name: 'press',
          text: c.label,
          type: 'button',
          reply: c.reply
        }))
      }
    ]
  }
]
