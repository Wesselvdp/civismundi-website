/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const serializers = {
  types: {
    block({ node, ...rest }) {
      switch (node.style) {
        case 'h1':
          return <Styled.h1 {...rest} />
        case 'h2':
          return <Styled.h2 {...rest} />
        case 'h3':
          return <Styled.h3 {...rest} />
        case 'h4':
          return <Styled.h4 {...rest} />
        case 'h5':
          return <Styled.h5 {...rest} />
        case 'h6':
          return <Styled.h6 {...rest} />
        case 'blockquote':
          return <Styled.blockquote {...rest} />
        case 'strong':
          return <strong {...rest} />
        case 'em':
          return <em {...rest} />
        default:
          return <Styled.p {...rest} />
      }
    }
  },
  marks: {
    link: ({ children, mark }) => (
      <Styled.a href={mark.href}>{children}</Styled.a>
    )
  }
}

export default serializers
