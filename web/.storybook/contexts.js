import { ThemeProvider } from 'theme-ui'
import {
  createMemorySource,
  createHistory,
  LocationProvider
} from '@reach/router'

import theme from '../src/gatsby-plugin-theme-ui'

let source = createMemorySource('/')
let dutchSource = createMemorySource('/nl')
let history = createHistory(source)
let dutchHistory = createHistory(dutchSource)

const contexts = [
  {
    icon: 'box',
    title: 'Themes',
    components: [ThemeProvider],
    params: [
      {
        name: 'Main theme',
        default: true,
        props: { theme }
      },
      {
        name: 'Development',
        props: {
          theme: {
            ...theme,
            useColorSchemeMediaQuery: false,
            styles: {
              ...theme.styles,
              root: {
                ...theme.styles.root,
                backgroundColor: 'transparent',
                backgroundImage:
                  'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC)'
              }
            }
          }
        }
      }
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: false
    }
  },
  {
    icon: 'flag',
    title: 'Router context',
    components: [LocationProvider],
    params: [
      {
        name: 'Default route',
        default: true,
        props: { history }
      }
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: false
    }
  }
]

export default contexts
