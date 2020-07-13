import icon from 'react-icons/lib/md/local-movies'

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100
      }
    },
    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      title: 'Launchpad Location',
      name: 'location',
      type: 'geopoint'
    },

    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster'
    },
    prepare(selection) {
      const year = selection.date && selection.date.split('-')[0]
      const cast = [selection.castName0, selection.castName1]
        .filter(Boolean)
        .join(', ')

      return {
        title: `${selection.title} ${year ? `(${year})` : ''}`,
        date: selection.date,
        subtitle: cast,
        media: selection.media
      }
    }
  }
}
