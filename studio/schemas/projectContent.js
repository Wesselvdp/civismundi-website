export default {
  name: 'projectContent',
  title: 'Project content',
  type: 'document',
  fields: [
    {
      name: 'left',
      title: 'Left column',
      type: 'array',
      of: [
        {
          title: 'Entry',
          name: 'entry',
          type: 'entry',
        }
      ]
    },
    {
      name: 'middle',
      title: 'Middle column',
      type: 'array',
      of: [
        {
          title: 'Entry',
          name: 'entry',
          type: 'entry',
        }
      ]
    },
    {
      name: 'right',
      title: 'Right column',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'award' }]
        }
      ]
    },
  ]
}
