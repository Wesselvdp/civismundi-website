import icon from 'react-icons/lib/md/person'

export default {
  name: 'director',
  title: 'Director',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format'
    }
  ],
  preview: {
    select: { title: 'name' }
  }
}
