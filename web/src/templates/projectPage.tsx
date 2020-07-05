import React, { FC, useEffect } from 'react'

import styled from 'styled-components'
import localize from '@utils/localize'
import { graphql } from 'gatsby'

// Components
import BackgroundVideo from '@components/BackgroundVideo'
import Layout from '@components/Layout';
type PageProps = {
  data: {
    singleProject: {
      title: string;
      slug: {
        current: string
      }
    }
  }
}

const ProjectPageTemplate: FC<PageProps> = ({ data }) => {

  return (
    <Layout>
      <StyledMast>
        <FixedBackground>
          <div className="overlay" />
          <BackgroundVideo />
        </FixedBackground>
      </StyledMast>
    </Layout>
  )
}

const StyledMast = styled.div`
  position: relative;
`

const FixedBackground = styled.div`
  position: fixed;
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
  }
`

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
