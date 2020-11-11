export default {
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4
    },
    {
      name: 'quotee',
      title: 'Quotee',
      type: 'string'
    }
  ]
}
