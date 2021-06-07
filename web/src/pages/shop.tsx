// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import Client from 'shopify-buy'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { SEO } from '@components/html'
import { ShopProducts } from '@components/webshop'
import { breakpoints } from '@utils/breakpoints'

const ShopPage = () => {
  const shopify = useRef({ client: null, ui: null })

  useEffect(() => {
    // eslint-disable-next-line no-undef
    shopify.current.client = ShopifyBuy.buildClient({
      domain: 'roybro1.myshopify.com',
      storefrontAccessToken: '6e5af8fe47e1068f0eff6c177e96897a',
    })

    // eslint-disable-next-line no-undef
    shopify.current.ui = ShopifyBuy.UI.init(shopify.current.client)

    shopify.current.ui.createComponent('productSet', {
      id: [
        6162482266264,
        6162482266264,
        6162482266264,
        6162482266264,
        6162482266264,
        6162482266264,
      ],
      node: document.getElementById('products'),
      options: {
        product: {
          templates: {
            title:
              '<span style="font-size:20px; text-transform: uppercase; color:#fff; font-family:OriyaMN, Helvetica Neue LT, Helvetica, Arial, sans-serif;">{{data.title}}</span>',
            price: `<h5 style="font-size:20px; color:#fff; font-weight: 700; margin: 10px 0 15px; font-family:'Druk Wide Super';">&#36;{{data.selectedVariant.price}}</h5>`,
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
              margin: '0 0 100px',
            },
            price: {
              'font-weight': '700',
              margin: '10px 0 15px',
            },
            options: {
              color: '#fff',
              background: 'transparent',
              'font-weight': '700',
            },
          },
        },
        toggle: {
          contents: {
            count: false,
          },
          styles: {
            toggle: {
              'background-color': 'transparent',
              ':hover': {
                'background-color': 'transparent',
              },
            },
          },
        },
        options: {
          styles: {
            options: {
              color: '#fff',
              background: 'transparent',
              'font-weight': '700',
            },
          },
        },
      },
    })

    return () => {
      const products = document.getElementById('products')
      if (products) products.innerHTML = ''
    }
  }, [])

  return (
    <>
      <SEO title="Webshop" />
      <Products>
        <h2 className="subtitle">SHOP</h2>
        <div id="products" />
        <Link to="/">HOMEPAGE</Link>
      </Products>
    </>
  )
}

const Products = styled.div`
  text-align: center;
  margin-top: 100px;
  padding-bottom: 100px;

  #products {
    display: flex !important;
    min-height: 100vh;

    @media ${breakpoints.phoneOnly} {
      padding-top: 20px;
    }
  }

  h2 {
    font-size: 40px;
  }

  iframe {
    z-index: 100000;
    overflow: scroll !important;
  }

  a {
    border: 2px solid #fff;
    padding: 1.2rem 2rem;
    font-family: Druk Wide Super;
  }
`

export default ShopPage
