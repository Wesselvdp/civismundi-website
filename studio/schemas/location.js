export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint'
    }
  ]
}
