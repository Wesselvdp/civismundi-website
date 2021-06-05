import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy';
import styled from 'styled-components'
import { uniqBy } from 'lodash'

import { SEO, Hero } from '@components/general'
import { ProjectList } from '@components/projects'
import { breakpoints } from '@utils/breakpoints'

import localize from '@utils/localize'

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

type PageProps = {
  data: {
    allSanityProject: AllProject
  }
  transitionStatus: string
}

const options = [{ title: 'All directors', value: 'all' }]

const perPage = 4

// Initializing a client to return content in the store's primary language

var client = ShopifyBuy.buildClient({
    domain: 'zentech-dev.myshopify.com',
    storefrontAccessToken: '21084537765472a686507d9624ec4bd1'
});
  var ui = ShopifyBuy.UI.init(client);
  

ui.createComponent('productSet', {
  id: [6802327797910, 6806919217302],
  node: document.getElementById('products'),
  options: {
    styles: {
      button: {
        'color': 'red',
        ':hover': {
          'color': 'orange'
        }
      }
    },
    product: {
      templates: {
        title: '<span style="font-size:20px; color:#fff; font-family:OriyaMN, Helvetica Neue LT, Helvetica, Arial, sans-serif;">{{data.title}}</span>',
        price: '<h5 style="font-size:16px; color:#fff; font-family:Druk Wide Super;">&#36;{{data.selectedVariant.price}}</h5>'
    },
  },
  }
});


  

const Shop = ({ data, transitionStatus }: PageProps) => {
  const [page, setPage] = useState(0)
  const [director, setDirector] = useState('all')
  const [selectOptions, setSelectOptions] = useState(options)
  const [heroFinished, setHeroFinished] = useState(false)





  // useEffect(() => {
  //   const directorsUnique = uniqBy(
  //     [].concat(
  //       ...data.allSanityProject.edges.map((p) =>
  //         p.node.director.map((director) => ({
  //           title: director.name,
  //           value: director.id,
  //         }))
  //       )
  //     ),
  //     (director) => director.value
  //   )

  //   setSelectOptions([...options, ...directorsUnique])
  // }, [])

  // useEffect(() => {
  //   setPage(0)
  // }, [director])

  return (
    <>
      <SEO title="Projects" />
      <Page>
        <HeroContainer>
        
          <Hero
            title="Shop"
            timeout={{ title: 500, subtitle: 300, content: 0 }}
            onFinished={() => setHeroFinished(true)}
          />
           
        </HeroContainer>
        {heroFinished && (
          <div style={{marginTop:'40px'}} id="products"></div>
        )}

      </Page>
    </>
  )
}

const Page = styled.div`
  position: relative;
  padding-bottom: 2em;
`

const HeroContainer = styled.div`
  padding-top: 11em;

  @media ${breakpoints.phoneOnly} {
    padding-top: 6em;
  }
`

const ProductContainer = styled.div`
  display:flex;
`


export default localize(Shop)
