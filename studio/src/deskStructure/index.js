import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Content')
        .child(
          S.document()
            .title('General content')
            .schemaType('content')
            .documentId('content')
        ),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        listItem => !['content', 'projectContent', 'entry'].includes(listItem.getId())
      )
    ])
