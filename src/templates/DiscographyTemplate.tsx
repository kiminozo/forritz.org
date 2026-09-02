import React from "react"

// Utilities
import _ from "lodash"

// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout, SideBar } from "../components"

import { Divider, Grid, Typography } from "@mui/material"

import DiscographyLayout, {
  DiscographyInfo,
} from "../components/DiscographyLayout"



interface ContextProps {
  pageContext: {
    category: string
  }
}

interface TemplateProps {
  title: string
  path: string

  data: {
    records: {
      nodes: {
        frontmatter: DiscographyInfo
      }[]
    }
  }
}

const DiscographyTemplate = (props: TemplateProps) => {
  const {
    title,
    path,
    data: {
      records: { nodes },
    },
  } = props

  const records = nodes.map((p) => p.frontmatter)

  return (
    <Layout path={path}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h1" component="h1">
            {title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <DiscographyLayout records={records} />
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SideBar />
        </Grid>
      </Grid>
    </Layout>
  )
}

export const Head = (
  props: TemplateProps & ContextProps
) => (
  <SEO title={props.pageContext.category} />
)

export default function Template(
  props: TemplateProps & ContextProps
) {
  const category = props.pageContext.category

  const path = `/discography/${_.kebabCase(category)}/`

  return (
    <DiscographyTemplate
      {...props}
      path={path}
      title={category}
    />
  )
}

export const query = graphql`
  query ($category: String) {
    records: allMarkdownRemark(
      filter: {
        frontmatter: {
          type: { eq: "record" }
          categories: { glob: $category }
        }
      }
      sort: { frontmatter: { order: ASC } }
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
  }
`
