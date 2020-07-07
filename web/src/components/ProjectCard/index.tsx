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
          <h4>type</h4>
          <h2>{title}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            quaerat numquam labore aut excepturi veritatis laboriosam porro
            vitae quas non! Reprehenderit consequatur natus beatae blanditiis
            porro ipsum necessitatibus accusamus expedita!
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
  margin-top: -3em;
  max-width: 600px;
  padding: 0 3em;
  text-decoration: none;
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
