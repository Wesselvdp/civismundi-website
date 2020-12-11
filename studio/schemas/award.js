import icon from 'react-icons/lib/md/star'

export default {
  name: 'award',
  title: 'Awards & Festivals',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    }
  ],
  preview: {
    select: { title: 'name', media: 'image' }
  }
}
