const size = {
  phone: `599px`,
  tabletLandscape: `900px`,
  desktop: '1200px',
  desktopLarge: '1800px'
}

export const breakpoints = {
  phoneOnly: `(max-width: ${size.phone})`,
  tabletLandscapeDown: `(max-width: ${size.tabletLandscape})`,
  tabletLandscapeUp: `(min-width: ${size.tabletLandscape})`,
  desktopUp: (`min-width: ${size.desktop}`),
  desktopLargeUp: `(min-width: ${size.desktopLarge})`
}