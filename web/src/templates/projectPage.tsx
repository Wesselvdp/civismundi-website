import React, { FC, useEffect } from 'react'

import styled from 'styled-components'
import localize from '@utils/localize'
import { graphql } from 'gatsby'

// Components
import BackgroundVideo from '@components/BackgroundVideo'
import Layout from '@components/Layout';
import TextAnimated from '@components/TextAnimated'
import { breakpoints } from '@utils/breakpoints';

type PageProps = {
  data: {
    sanityProject: {
      title: string;
      slug: {
        current: string
      }
    }
  }
}

const ProjectPageTemplate: FC<PageProps> = ({ data }) => {
  console.log(data.sanityProject)
  const { title } = data.sanityProject
  return (
    <Layout>
      {/* Mast */}
      <StyledMast>
        <FixedBackground>
          <div className="overlay" />
          <BackgroundVideo />
        
        </FixedBackground>
        <Content>
          <div className="inner">
          <TextAnimated tag="span" showText={true} text='pre-title' />
          <TextAnimated tag="h2" showText={true} text={title} />
          <TextAnimated tag="p" showText={true} text="orem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quasi odio, minima, quam debitis qui " />

          </div>
        </Content>
      </StyledMast>

      {/* Project content */}
      <Section>
        
      <div className="col meta">
        <div>
          <p className="pre-title">Directed by</p>
          <p className="lead">Nabil Elderkin</p>
        </div>
        <div>
          <p className="pre-title">Location</p>
          <p className="lead">Los Angeles</p>
        </div>
        <div>
          <p className="pre-title">Awards & Festivals</p>
          <p className="lead">Los Angeles</p>
        </div>
      </div>
      <div className="col content">
        content
      </div>
      </Section>
    </Layout>
  )
}

const StyledMast = styled.div`
  position: relative;
  `

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media ${breakpoints.tabletLandscapeUp} {
    align-items: center;
  }

  .inner {
    padding: 15px;
  }
`

const Section = styled.section`
  padding: 2em 0;
  display: flex;
  flex-flow: row wrap;


  .col {
    &.meta {
      flex: 100% 1 1;
      background: purple;

      @media ${breakpoints.tabletLandscapeUp} {
        flex: 1;
      }
    }

    &.content {
      flex: 2;
      background: green;
    }
    
}
`

const FixedBackground = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
}`

export const query = graphql`
  query singleProject($id: String!) {
    sanityProject(id: { eq: $id }) {
      title 
      slug {
        current
      }
    }
  }
`

export default localize(ProjectPageTemplate)
