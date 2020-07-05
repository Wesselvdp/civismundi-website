import React from 'react'
import { GatsbyLinkProps, Link } from 'gatsby'

import getLocalizedURL from '@utils/getLocalizedURL'
import useLocale from '@hooks/useLocale'

const LocalizedLink = ({ to, ...rest }: GatsbyLinkProps<{}>) => {
  const { locale } = useLocale()
  return (
    <Link activeClassName="active" to={getLocalizedURL(locale, to)} {...rest} />
  )
}

export default LocalizedLink
