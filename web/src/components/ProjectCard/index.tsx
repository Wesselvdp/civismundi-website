import React, { FC } from 'react'
import styled from 'styled-components'
import LocalizedLink from '@components/LocalizedLink'

type T = {
  data: Project
}

const ProjectCard: FC<T> = ({ data }) => {
  const { title, slug } = data
  return (
    <LocalizedLink to={`/projects/${slug.current}`}>
      <Card>
        <Visual
          style={{ backgroundImage: `url('https://picsum.photos/400/300')` }}
        />
        <Content>
          <h6 className="pre-title">VIDEO DIRECTION</h6>
          <h4 className="title">{title}</h4>
          <p className="p--small text-lighter">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            quaerat numquam labore aut excepturi veritatis laboriosam
          </p>
        </Content>
      </Card>
    </LocalizedLink>
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

  h6 {
    margin-bottom: 0;
  }

  h4 {
    margin-bottom: 0;
  }

  p {
    max-width: 75%;
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
