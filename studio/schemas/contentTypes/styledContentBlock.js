export default {
  title: 'Styled Content Block',
  name: 'styledContentBlock',
  type: 'object',
  fields: [
    {
      title: 'Pre title',
      name: 'preTitle',
      type: 'string'
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pretitle'
    }
  }
}
