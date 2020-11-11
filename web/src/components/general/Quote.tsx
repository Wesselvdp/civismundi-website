import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'

import { TextImprov } from '@components/animations'
import { stringifyArray } from '../../utils'

const Quote = ({ project, className, ...rest }) => {
  const [content, setContent] = useState('')
  const [quotee, setQuotee] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    if (project) {
      setContent(get(project, 'node.quote.content', stringifyArray(get(project, 'node.clients', []), '', ' • ', { uppercase: true })).toUpperCase())
      setQuotee(get(project, 'node.quote.content') ? get(project, 'node.quote.quotee', '').toUpperCase() : '')
      setType(project.node.quote && project.node.quote.content ? 'quote' : 'clients')
    }
  }, [project])

  return (
    <>
      <TextImprov style={{ marginBottom: '6px' }} className={`${className} ${type === 'quote' ? 'italic' : ''}`} {...rest} text={`${type === 'quote' ? `"${content}"` : content}`} />
      {quotee && (<TextImprov {...rest} className={className} text={`${quotee ? `- ${quotee}` : ''}`} />)}
    </>

  )
}

export default Quote
