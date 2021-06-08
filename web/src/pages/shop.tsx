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
        productSet: {
          iframe: false,
        },
        product: {
          iframe: false,
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
        <Disclaimer>
          <p>ALLOW 2-3 WEEKS FOR SHIPMENT</p>
          <p>ALL SALES ARE FINAL</p>
        </Disclaimer>
        <Link to="/">
          <img src="/arrow-left.svg" />
          HOMEPAGE
        </Link>
      </Products>
    </>
  )
}

const Products = styled.div`
  text-align: center;
  margin-top: 100px;
  padding-bottom: 100px;

  @media ${breakpoints.phoneOnly} {
    h2 {
      display: none;
    }
  }

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

  a {
    border: 1px solid #fff;
    padding: 1.2rem 3.5rem;
    font-family: Druk Wide Super;
    font-size: 16px;

    img {
      width: 21px;
      vertical-align: middle;
      margin-right: 15px;
      margin-bottom: 5px;
      transform: translateX(-0);
      transition: all 0.3s ease;
    }

    &:hover img {
      transform: translateX(-50%);
    }
  }
`

const Disclaimer = styled.div`
  margin-bottom: 50px;

  p {
    margin: 0;
  }
`

export default ShopPage
