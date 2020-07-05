const { defaultLanguage, languages } = require('../studio/supportedLanguages')

// // Filter the default language.
const extraLanguages = languages.filter(lang => !lang.isDefault)

const createLocalePage = (page, createPage) => {
  const { context, ...rest } = page

  createPage({
    ...rest,
    context: {
      ...context,
      languages,
      locale: defaultLanguage
    }
  })

  if (extraLanguages.length) {
    extraLanguages.forEach(lang => {
      const { path, context, ...rest } = page

      createPage({
        ...rest,
        path: `/${lang.id}${path}`,
        // every page for each language gets the language code as a prefix
        // to its path: "/es/blog/<some-slug>" for example
        context: {
          ...context,
          languages,
          locale: lang.id
        }
      })
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)

  createLocalePage(page, createPage)
}

//   // 1. Query projects
const createCustomPages = async (graphql, createPage) => {
  const result = await graphql(`
    {
      allSanityProject {
        edges {
          node {
            title
            slug {
              current
            }
            id
          }
        }
      }

    }
  `)
  if (result.errors) {
    throw result.errors
  }

//   // 2. Extract subpages
  const projects = result.data.allSanityProject.edges || []
//   const globalPages = result.data.allSanityMainPage.edges || []

//   let subPagesToCreate = []
//   cities.forEach(({ node }) => {
//     if (!node.subpages.length) return
//     const citySlug = node.slug.current
//     node.subpages.forEach(sub => {
//       if (!sub || !sub.layout) return
//       const res = {
//         city: citySlug,
//         id: sub.id,
//         slug: `${citySlug}/${sub.template.slug.current}`,
//         layout: sub.layout._type
//       }
//       subPagesToCreate.push(res)


//   // 3. Create citypages
  projects.forEach(({ node }, index) => {
    const page = {
      path: `/${node.slug.current}`,
      component: require.resolve(`./src/templates/projectPage.tsx`),
      context: { id: node.id, city: node.slug.current }
    }
    // We want local pages
    createLocalePage(page, createPage)
  })

//   // 4. Create city sub pages
//   subPagesToCreate.forEach(({ city, layout, slug, id }, index) => {
//     const page = {
//       path: `/${slug}`,
//       component: require.resolve(`./src/templates/${layout}.tsx`),
//       context: { id, slug: slug, city: city }
//     }
//     // We want local pages
//     createLocalePage(page, createPage)
//   })

//   // 5. Create global pages
//   globalPages.forEach(({ node: { id, slug, layout } }) => {
//     if (!layout) return
//     const page = {
//       path: `/${slug.current}`,
//       component: require.resolve(`./src/templates/${layout._type}.tsx`),
//       context: { id, slug: slug.current }
//     }
//     // We want local pages
//     createLocalePage(page, createPage)
//   })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  createCustomPages(graphql, createPage)
}
