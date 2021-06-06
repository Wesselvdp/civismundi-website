import React, { useEffect } from 'react'
import Client from 'shopify-buy'

const ShopProducts = ({ client }) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const ui = ShopifyBuy.UI.init(client)

    ui.createComponent('productSet', {
      id: [6802327797910, 6806919217302],
      node: document.getElementById('products'),
      options: {
        styles: {
          button: {
            color: 'red',
            ':hover': {
              color: 'orange',
            },
          },
        },
        product: {
          templates: {
            title:
              '<span style="font-size:20px; color:#fff; font-family:OriyaMN, Helvetica Neue LT, Helvetica, Arial, sans-serif;">{{data.title}}</span>',
            price:
              '<h5 style="font-size:16px; color:#fff; font-family:Druk Wide Super;">&#36;{{data.selectedVariant.price}}</h5>',
          },
        },
      },
    })
  }, [])

  return <div id="products" />
}

export default ShopProducts
