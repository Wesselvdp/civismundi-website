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
          styles: {
            toggle: {
              'background-color': 'transparent',
              ':hover': {
                'background-color': 'transparent',
              },
              count: {
                position: 'absolute',
                top: 0,
                right: '5px',
                'font-weight': 700,
                'font-size': '12px',
              },
            },
          },
        },
        cart: {
          popup: false,
          contents: {
            button: true,
          },
          // text: {
          //   title: 'WARENKORB',
          //   total: 'Zwischensumme',
          //   notice:
          //     'Versand- und Rabattcodes werden beim Checkout hinzugefügt.',
          //   empty: 'Dein Warenkorb ist leer.',
          // },
          styles: {
            button: {
              'background-color': '#000000',
              'font-family': 'Source Sans Pro, sans-serif',
              ':hover': {
                'background-color': '#000000',
              },
              'border-radius': '0px',
              'font-weight': 'bold',
              ':focus': {
                'background-color': '#000000',
              },
            },
            title: {
              color: '#000000',
            },
            footer: {
              'background-color': '#ffffff',
            },
            header: {
              color: '#000000',
            },
            lineItems: {
              color: '#000000',
            },
            subtotalText: {
              color: '#000000',
            },
            subtotal: {
              color: '#000000',
            },
            notice: {
              color: '#000000',
            },
            currency: {
              color: '#000000',
            },
            close: {
              ':hover': {
                color: '#000000',
              },
              color: '#000000',
            },
            emptyCart: {
              color: '#000000',
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
