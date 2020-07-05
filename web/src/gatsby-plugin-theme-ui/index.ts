import { Theme } from 'theme-ui'

const colors = {
  grays: {
    '100': 'hsla(240, 1%, 100%, 1)',
    '200': 'hsla(240, 1%, 80%, 1)',
    '300': 'hsla(240, 1%, 60%, 1)',
    '400': 'hsla(240, 1%, 40%, 1)',
    '500': 'hsla(240, 1%, 20%, 1)',
    '600': 'hsla(240, 1%, 00%, 1)'
  },
  blues: {
    '100': 'hsla(235, 30%, 90%, 1)',
    '300': 'hsla(235, 50%, 60%, 1)',
    '400': 'hsla(235, 70%, 60%, 1)',
    '600': 'hsla(235, 40%, 20%, 1)'
  },
  reds: {
    '100': 'hsla(10, 30%, 90%, 1)',
    '200': 'hsla(10, 50%, 80%, 1)',
    '300': 'hsla(10, 60%, 60%, 1)',
    '400': 'hsla(10, 76%, 50%, 1)',
    '500': 'hsla(10, 40%, 20%, 1)'
  }
}

const themeColors = {
  ...colors,
  text: {
    subtle: colors.grays[200],
    body: colors.grays[600],
    heading: colors.grays[500],
    white: colors.grays[100]
  },
  background: colors.grays[100],
  primary: colors.blues[400],
  secondary: '#30c',
  accent: 'red',
  muted: '#f6f6f6',
  error: colors.reds[400],
  highlight: colors.blues[100]
  // modes: {
  //   dark: {
  //     text: 'grays.200',
  //     background: '#000',
  //     primary: '#07c',
  //     secondary: '#30c',
  //     accent: 'blue',
  //     muted: '#f6f6f6'
  //   }
  // }
}

interface ICityHubTheme extends Theme {
  colors: any
  messages: any
  space: { [key: string]: number }
  useColorSchemeMediaQuery: boolean
}

const theme: ICityHubTheme = {
  breakpoints: ['40em', '52em', '64em'],
  space: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 16,
    '4': 32,
    '5': 64,
    '6': 128,
    '7': 256,
    '8': 512
  },
  radii: [0, 2, 3, 4, 6, 8, 10, 16],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"recoleta", system-ui, -apple-system, sans',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  useColorSchemeMediaQuery: false,
  colors: themeColors,
  // @ts-ignore
  buttons: {
    primary: {
      color: 'text.white',
      bg: 'primary',
      borderRadius: 2
    },
    secondary: {
      color: 'text.white',
      bg: 'secondary',
      borderRadius: 2
    },
    accent: {
      color: 'text.white',
      bg: 'accent',
      borderRadius: 2
    }
  },
  messages: {
    error: {
      bg: colors.reds[100],
      borderLeftColor: colors.reds[400],
      color: 'text.body'
    },
    info: {
      bg: colors.blues[100],
      color: 'text.body'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6
    },
    h2: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4
    },
    h3: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3
    },
    h4: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2
    },
    h5: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1
    },
    h6: {
      color: 'text.heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0
    },
    p: {
      color: 'text.body',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'inherit'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      display: 'block',
      maxWidth: '100%'
    }
  }
}

// Aliases
theme.space.gutter = theme.space[2]
theme.space.xxsmall = theme.space[1]
theme.space.xsmall = theme.space[2]
theme.space.small = theme.space[3]
theme.space.medium = theme.space[4]
theme.space.large = theme.space[5]
theme.space.xlarge = theme.space[6]
theme.space.xxlarge = theme.space[7]

export default theme
