const defaultLocale = 'en'

// Maybe useful code here: https://github.com/vtellier/gatsby-plugin-intl-url/blob/master/src/PathFinder.js

const getLocalizedURL = (locale: string, path: string, city?: string) => {
  const match = path.match(/^\/?(\w{2})(\/.+)?/)
  if (match && match.length > 1) {
    const urlLocale = match[1]
    const cleanPath = match[2]

    const newLocale = locale === defaultLocale ? '' : locale
    const newPath = cleanPath
      ? `/${cleanPath}`
      : urlLocale === path.replace('/', '')
      ? ''
      : path
    return `${newLocale}${city ? `/${city}` : ''}${newPath}`
  } else {
    if (path.length > 1 && path.slice(-1) === '/') path = path.slice(0, -1)

    const prefix = locale === defaultLocale ? '' : locale
    if (path !== '' && path.charAt(0) !== '/') path = '/' + path

    return `${prefix}${city ? `/${city}` : ''}${path === '/' ? '' : path}`
  }
}

export default getLocalizedURL
