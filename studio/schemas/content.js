import icon from 'react-icons/lib/md/person'

export default {
  name: 'content',
  title: 'Content',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Home',
      name: 'home',
      type: 'object',
      fields: [
        {
          name: 'intro',
          title: 'intro',
          type: 'text',
          description: 'The animated intro text on the landing page'
        }
      ]
    },
    {
      title: 'About',
      name: 'about',
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
  ]
}
