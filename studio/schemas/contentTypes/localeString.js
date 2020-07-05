import Tabs from 'sanity-plugin-tabs'
import { languages } from '../../supportedLanguages'

export default {
  name: 'localeString',
  type: 'object',
  inputComponent: Tabs,

  fieldsets: languages.map(lang => ({
    title: lang.title,
    name: lang.id
  })),

  // puts border around fieldset
  options: {
    layout: 'object'
  },

  fields: languages.map(lang => ({
    title: ' ',
    name: lang.id,
    type: 'string',
    fieldset: lang.id
  })),

  preview: {
    select: {
      title: 'title'
      // media: 'logo',
    }
  }
}
