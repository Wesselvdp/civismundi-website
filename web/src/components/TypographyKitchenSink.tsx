import React from 'react'
import { Styled, Heading, Text, Divider } from 'theme-ui'

import LocalizedLink from '@components/LocalizedLink'

const TypographyKitchenSink = () => (
  <div>
    <Styled.h1>Heading 1</Styled.h1>
    <Styled.h2>Heading 2</Styled.h2>
    <Styled.h3>Heading 3</Styled.h3>
    <Styled.h4>Heading 4</Styled.h4>
    <Styled.h5>Heading 5</Styled.h5>
    <Styled.h6>Heading 6</Styled.h6>
    <Divider />
    <Styled.p>Paragraph</Styled.p>
    <Text>Text</Text>
    <Divider />
    <Heading>Heading Primitive</Heading>
    <Divider />
    <LocalizedLink to="/">Internal Link</LocalizedLink>
    <Styled.a href="https://cityhub.com">External Link</Styled.a>
  </div>
)

export default TypographyKitchenSink
