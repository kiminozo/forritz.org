import React from "react"
import _ from "lodash"
import { Link, graphql, PageProps } from "gatsby"
import { SEO, Layout, CoverImage, SideBar } from "../components"
import DiscographyLayout, { DiscographyInfo } from "../components/DiscographyLayout"
import { Grid, Divider } from "@mui/material"

interface Props extends PageProps {
  data: {
    records: {
      nodes: {
        frontmatter: DiscographyInfo
      }[]
    }
  }
}

export const Head = () => <SEO title="唱片集" />

const DiscographyPage = (props: Props) => {
  const { data: { records: { nodes } } } = props
  const records = nodes.map(p => p.frontmatter)

  return (
    <Layout path={props.location.pathname}>
      <Grid container spacing={2}>
        {/* 主内容 */}
        <Grid size={{ xs: 6, md: 8 }} >
          <h1>唱片集</h1>
          <Divider sx={{ my: 2 }} />
          <DiscographyLayout records={records} />
        </Grid>

        {/* 侧边栏 */}
        <Grid size={{ xs: 12, md: 4 }} >
          <SideBar />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default DiscographyPage

export const query = graphql`
{
  records: allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "record"}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      frontmatter {
        coverImage
        id
        title
        slug
        artist
        categories
      }
    }
  }
}`