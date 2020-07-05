import React from 'react'
import { useLocation, useMatch } from '@reach/router'
import { navigate } from 'gatsby'
import getLocalizedURL from '@utils/getLocalizedURL'

const defaultLocale = 'en'
const languages = ['en', 'nl']

const isValidLocale = (locale: string = '') => {
  return languages.includes(locale)
}

const useLocale = () => {
  const location = useLocation()
  // @ts-ignore
  const match: { lang?: string } | null = useMatch('/:lang/*')
  const [locale, setLocale] = React.useState(
    (match && isValidLocale(match.lang) && match.lang) || defaultLocale
  )

  React.useEffect(() => {
    if (
      match &&
      match.lang &&
      isValidLocale(match.lang) &&
      match.lang !== locale
    ) {
      setLocale(match.lang)
    }
  }, [match])

  const switchLocale = (langCode: string) => {
    // Check if language is available
    console.log(langCode, locale, location.pathname)
    if (langCode !== locale) {
      setLocale(langCode)
      navigate(getLocalizedURL(langCode, location.pathname))
    }
  }

  return { locale, switchLocale }
}

export default useLocale
