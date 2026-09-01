import React from "react"

import { Link, graphql } from "gatsby"

import {
  SEO,
  Layout,
  SideBar,
} from "../components"

import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"

interface TemplateProps {
  pageContext: {
    tag: string
  }

  data: {
    allMarkdownRemark: {
      totalCount: number

      nodes: {
        frontmatter: {
          slug: string
          title: string
        }
      }[]
    }
  }
}

export const Head = (props: TemplateProps) => (
  <SEO title={props.pageContext.tag} />
)

const TagsTemplatePage = (
  props: TemplateProps
) => {
  const {
    pageContext: { tag },
    data: {
      allMarkdownRemark: {
        nodes,
        totalCount,
      },
    },
  } = props

  return (
    <Layout>
      <Grid
        container
        columns={16}
        spacing={4}
      >
        {/* Main Content */}
        <Grid size={{ xs: 16, md: 11 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {tag}

            <Chip
              label={totalCount}
              color="primary"
              size="small"
            />
          </Typography>

          <Divider sx={{ my: 2 }} />

          <List disablePadding>
            {nodes.map(
              ({
                frontmatter: {
                  slug,
                  title,
                },
              }) => (
                <ListItem
                  key={slug}
                  disablePadding
                  divider
                >
                  <ListItemButton
                    component={Link}
                    to={slug}
                  >
                    <ListItemText
                      primary={title}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>

          <Button
            component={Link}
            to="/tags"
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
          >
            全部标签
          </Button>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 16, md: 5 }}>
          <SideBar />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function TagsTemplate({
  pageContext,
  data,
}: TemplateProps) {
  return (
    <TagsTemplatePage
      pageContext={pageContext}
      data={data}
    />
  )
}

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: {
        frontmatter: {
          date: DESC
        }
      }
      filter: {
        frontmatter: {
          tags: {
            in: [$tag]
          }
        }
      }
    ) {
      totalCount

      nodes {
        frontmatter {
          slug
          title
        }
      }
    }
  }
`
