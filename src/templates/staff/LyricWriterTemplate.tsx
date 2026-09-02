import React from "react"
import { graphql } from "gatsby"
import { StaffTemplatePage, TemplateProps } from './StaffTemplatePage'

export default function LyricWriterTemplate({ pageContext, data }: TemplateProps) {
  return (<StaffTemplatePage title={pageContext.staff} staffType="lyric-writer"
    pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`query ($staff: String, $skip: Int!, $limit: Int!) {
  songs: allMarkdownRemark(
    limit: $limit
    skip: $skip
    filter: {frontmatter: {lyricwriter: {in: [$staff]}}}
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
}`