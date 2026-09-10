import { graphql } from "gatsby"
import React from "react"
import { StaffTemplatePage, TemplateProps } from './StaffTemplatePage'

export default function vocalTemplate({ pageContext, data }: TemplateProps) {
  return (<StaffTemplatePage title={pageContext.staff} staffType="vocal"
    pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`query ($staff: String, $skip: Int!, $limit: Int!) {
  songs: allMarkdownRemark(
    limit: $limit
    skip: $skip
    filter: {frontmatter: {vocal: {in: [$staff]}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    totalCount
    nodes {
      song: frontmatter {
        slug
        title
        vocal
        composer: composer
        lyricist: lyricist
        arranger
        discographyId
      }
    }
  }

  vocal: allMarkdownRemark(
    filter: {
      frontmatter: {
        vocal: { eq: $staff }
      }
    }
  ) {
    totalCount
  }

  composer: allMarkdownRemark(
    filter: {
      frontmatter: {
        composer: { eq: $staff }
      }
    }
  ) {
    totalCount
  }

  lyricist: allMarkdownRemark(
    filter: {
      frontmatter: {
        lyricist: { eq: $staff }
      }
    }
  ) {
    totalCount
  }

  arranger: allMarkdownRemark(
    filter: {
      frontmatter: {
        arranger: { eq: $staff }
      }
    }
  ) {
    totalCount
  }
}`