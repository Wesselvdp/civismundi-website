import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'

import LocalizedLink from '@components/LocalizedLink'

const Footer = () => {
  //   const {
  //     allSanityMainPage: { nodes: globalPages }
  //   } = useStaticQuery(graphql`
  //     query {
  //       allSanityMainPage {
  //         nodes {
  //           id
  //           slug {
  //             current
  //           }
  //           title {
  //             ...LocaleStringFragment
  //           }
  //         }
  //       }
  //     }
  //   `)
  return <h1>Footer</h1>
}

export default Footer
