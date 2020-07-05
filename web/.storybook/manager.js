import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'dark',
  brandTitle: 'CityHub'
})

addons.setConfig({
  theme: theme
})
