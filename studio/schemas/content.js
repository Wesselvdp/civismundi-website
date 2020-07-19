import icon from 'react-icons/lib/md/person'

export default {
  name: 'content',
  title: 'Content',
  type: 'document',
  icon,
  fields: [
    {
      name: 'landingIntro',
      title: 'Landing intro',
      type: 'text',
      description: 'The animated intro text on the landing page'
    },
    {
      title: 'About',
      name: 'about',
      type: 'aboutContent'
    }
  ]
}
