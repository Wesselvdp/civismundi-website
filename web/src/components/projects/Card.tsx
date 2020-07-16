import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { get } from 'lodash'

import { breakpoints } from '@utils/breakpoints'

type T = {
  data: Project
}

const ProjectCard: FC<T> = ({ data }) => {
  const { title, slug } = data
  const poster = get(data, 'poster.asset.url')

  return (
    <Link to={`/projects/${slug.current}`}>
      <Card>
        <Visual
          style={{ backgroundImage: `url(${poster})` }}
        />
        <Content>
          <h5 className="subtitle">VIDEO DIRECTION</h5>
          <h4>{title}</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            quaerat numquam labore aut excepturi veritatis laboriosam
          </p>
        </Content>
      </Card>
    </Link>
  )
}

const Card = styled.div`
  text-align: left;
  max-width: 650px;
  margin: 0 auto;
`
const Content = styled.div`
  padding-left: 1em;
  text-decoration: none;
  margin-top: -3.5em;

  // h6 {
  //   margin-bottom: 0;
  // }

  // h4 {
  //   margin-bottom: 0;
  // }

  p {
    max-width: 75%;

    @media ${breakpoints.phoneOnly} {
      max-width: none;
    }
  }
`
const Visual = styled.div`
  margin-bottom: 1rem;
  background-size: cover;

  &::after {
    content: '';
    display: block;
    padding-top: 75%;
  }
`

export default ProjectCard
