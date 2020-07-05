import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { addParameters } from '@storybook/react'
import { withContexts } from '@storybook/addon-contexts/react'
import contexts from './contexts.js'

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(withContexts(contexts))

addParameters({
  options: {
    storySort: (a, b) => {
      if (a[1].kind === b[1].kind) return 0
      if (a[1].id.startsWith('docs')) {
        return -1
      }
      if (b[1].id.startsWith('docs')) {
        return 1
      }
      if (a[1].id.includes('elements')) return -1
      if (a[1].id.includes('containers')) return -1
      if (a[1].id.includes('patterns')) return 1
      return 0
    }
  }
})
