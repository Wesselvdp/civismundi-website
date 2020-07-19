import icon from 'react-icons/lib/md/person'

export default {
  name: 'aboutContent',
  title: 'About',
  type: 'object',
  fields: [
    {
      name: 'styledContentBlock',
      title: 'Content',
      type: 'styledContentBlock'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    }
  ]
}
