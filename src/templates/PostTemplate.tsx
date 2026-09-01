import React, { Component } from "react"

import { graphql, Link } from "gatsby"

import {
  SEO,
  Layout,
  TagsLine,
  SideBar,
  CC,
  License,
} from "../components"

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

type TemplateProps = {
  pageContext: {
    slug: string
    previous?: string
    next?: string
  }

  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        slug: string
        date?: string
        categories?: string[]
        tags?: string[]
        license?: License
      }

      html: string
    }
  }
}

export const Head = (props: TemplateProps) => (
  <SEO
    title={
      props.data.markdownRemark.frontmatter.title
    }
  />
)

class PostTemplate extends Component<TemplateProps> {
  renderTags() {
    const { markdownRemark } = this.props.data
    const {
      categories,
      tags,
      license,
    } = markdownRemark.frontmatter

    return (
      <>
        <Divider sx={{ my: 3 }} />

        <TagsLine
          categories={categories}
          tags={tags}
        />

        <CC license={license} />
      </>
    )
  }

  render() {
    const { previous, next } = this.props.pageContext

    const { markdownRemark } = this.props.data

    const { frontmatter, html } = markdownRemark

    return (
      <Layout path={frontmatter.slug}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="h1"
              component="h1"
            >
              {frontmatter.title}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
              className="blog-post-content"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />

            {this.renderTags()}

            {/* Previous / Next */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Button
                component={Link}
                to={previous ?? "/"}
                disabled={!previous}
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                上一篇
              </Button>

              <Button
                component={Link}
                to={next ?? "/"}
                disabled={!next}
                variant="outlined"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              >
                下一篇
              </Button>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <SideBar />
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default function Template({
  pageContext,
  data,
}: TemplateProps) {
  return (
    <PostTemplate
      pageContext={pageContext}
      data={data}
    />
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
      html

      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        categories
        tags

        license {
          type
          author
          translator
          reproduced_url
          reproduced_website
        }
      }
    }
  }
`
