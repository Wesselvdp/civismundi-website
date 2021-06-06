// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import Client from 'shopify-buy'
import styled from 'styled-components'

import { SEO } from '@components/html'
import { ShopProducts } from '@components/webshop'

const ShopPage = () => {
  const shopify = useRef({ client: null, ui: null })

  useEffect(() => {
    // eslint-disable-next-line no-undef
    shopify.current.client = ShopifyBuy.buildClient({
      domain: 'zentech-dev.myshopify.com',
      storefrontAccessToken: '21084537765472a686507d9624ec4bd1',
    })

    // eslint-disable-next-line no-undef
    shopify.current.ui = ShopifyBuy.UI.init(shopify.current.client)

    shopify.current.ui.createComponent('productSet', {
      id: [6802327797910, 6806919217302],
      node: document.getElementById('products'),
      options: {
        product: {
          iframe: false,
          templates: {
            title:
              '<span style="font-size:20px; text-transform: uppercase; color:#fff; font-family:OriyaMN, Helvetica Neue LT, Helvetica, Arial, sans-serif;">{{data.title}}</span>',
            price:
              '<h5 style="font-size:16px; color:#fff; font-family:Druk Wide Super; font-weight: 700;">&#36;{{data.selectedVariant.price}}</h5>',
            // button: '<button>TEST</button>',
          },
          styles: {
            button: {
              color: '#fff',
              background: 'transparent',
              border: '2px solid #fff',
              'font-weight': '700',
              transition: '0.25s all',
              ':hover': {
                background: '#fff',
                color: '#000',
              },
            },
            img: {
              height: '350px',
            },
            product: {
              width: '50%',
              margin: '0 0 590px',
            },
          },
        },
      },
    })
  }, [])

  return (
    <>
      <SEO title="Webshop" />
      <Products>
        <h2 className="subtitle">SHOP</h2>
        <div id="products" />
      </Products>
    </>
  )
}

const Products = styled.div`
  text-align: center;
  margin-top: 100px;

  #products {
    display: flex !important;
    min-height: 100vh;
  }

  h2 {
    font-size: 40px;
  }

  iframe {
    z-index: 100000;
    overflow: scroll !important;
  }
`

export default ShopPage
