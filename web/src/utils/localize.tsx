import React from 'react'
import createLocaleTextGetter from '@utils/createLocaleTextGetter'

type TLocalizeProps = {
  data: unknown
  pageContext: {
    locale: string
  }
}

function localize(Component: any) {
  return class Localize extends React.Component<TLocalizeProps> {
    getLocalizedContent: (data: unknown) => unknown

    constructor(props: Readonly<TLocalizeProps>) {
      super(props)
      this.getLocalizedContent = createLocaleTextGetter(
        this.props.pageContext.locale
      )
    }

    render() {
      return (
        <Component
          {...this.props}
          data={this.getLocalizedContent(this.props.data)}
        />
      )
    }
  }
}
export default localize
