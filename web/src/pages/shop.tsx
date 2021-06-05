import React from 'react'

import { SEO } from '@components/html'
import { ShopProducts } from '@components/webshop'

const ShopPage = () => {
  return (
    <>
      <SEO title="Webshop" />
      <ShopProducts />
    </>
  )
}

export default ShopPage
