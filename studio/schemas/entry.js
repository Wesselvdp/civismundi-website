export default {
  name: 'entry',
  title: 'Entry',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'string'
    },
    {
      name: 'specialFont',
      title: 'Use special font',
      type: 'boolean',
      default: false
    }
  ]
}
