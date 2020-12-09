// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import project from './project'
import director from './director'
import award from './award'
import entry from './entry'
import projectContent from './projectContent'
import content from './content'
import styledContentBlock from './contentTypes/styledContentBlock'
import aboutContent from './contentTypes/aboutContent'
import location from './location'
import quote from './contentTypes/quote'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    project,
    location,
    director,
    aboutContent,
    styledContentBlock,
    content,
    award,
    entry,
    projectContent,
    blockContent,
    quote
  ])
})
