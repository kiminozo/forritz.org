import { Divider, Grid, Typography } from "@mui/material"
import { graphql, PageProps } from "gatsby"
import React from "react"
import { Layout, SEO, SideBar } from "../components"
import DiscographyLayout, { DiscographyInfo } from "../components/DiscographyLayout"

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
        <Grid size={{ xs: 12, md: 10 }} >
          <Typography variant="h4" sx={{ px: 3, pb: 3 }}>
            唱片集
          </Typography>
          <Divider sx={{ my: 1, px: 3 }} />
          <DiscographyLayout records={records} />
        </Grid>

        {/* 侧边栏 */}
        <Grid size={{ xs: 12, md: 2 }} >
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