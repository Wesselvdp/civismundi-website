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
      name: 'featured',
      title: 'Is featured',
      type: 'boolean'
    },
    {
      name: 'director',
      title: 'Directors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'director' }]
        }
      ]
    },
    {
      name: 'awards',
      title: 'Awards & Festivals',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'award' }]
        }
      ]
    },

    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }]
    },

    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      title: 'Coordinates',
      name: 'location',
      type: 'geopoint'
    },
    {
      name: 'locationGroup',
      title: 'Location',
      type: 'reference',
      to: { type: 'location' }
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
      name: 'vimeo',
      title: 'vimeoUrl',
      type: 'string'
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
