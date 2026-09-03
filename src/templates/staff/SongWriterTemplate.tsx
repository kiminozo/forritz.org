import React from "react"
import { graphql } from "gatsby"
import { StaffTemplatePage, TemplateProps } from './StaffTemplatePage'

export default function SongWriterTemplate({ pageContext, data }: TemplateProps) {
  return (<StaffTemplatePage title={pageContext.staff} staffType="song-writer"
    pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`query ($staff: String, $skip: Int!, $limit: Int!) {
  songs: allMarkdownRemark(
    limit: $limit
    skip: $skip
    filter: {frontmatter: {songwriter: {in: [$staff]}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    totalCount
    nodes {
      song: frontmatter {
        slug
        title
        singer
        songWriter: songwriter
        lyricWriter: lyricwriter
        arranger
      }
    }
  }

  singer: allMarkdownRemark(
    filter: {
      frontmatter: {
        singer: { eq: $staff }
      }
    }
  ) {
    totalCount
  }

  songWriter: allMarkdownRemark(
    filter: {
      frontmatter: {
        songwriter: { eq: $staff }
      }
    }
  ) {
    totalCount
  }

  lyricWriter: allMarkdownRemark(
    filter: {
      frontmatter: {
        lyricwriter: { eq: $staff }
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