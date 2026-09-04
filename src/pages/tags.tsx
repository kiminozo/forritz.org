import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link as GLink, graphql } from "gatsby"
import { Box, Chip, Typography } from "@mui/material"

import { SEO, Layout } from "../components"

type TagGroup = {
  fieldValue: string
  totalCount: number
}

type TagsPageProp = {
  data: {
    allMarkdownRemark: {
      group: TagGroup[]
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export const Head = () => <SEO title="Tags" />

const TagsPage = (props: TagsPageProp) => {
  const {
    data: {
      allMarkdownRemark: { group },
      site: {
        siteMetadata: { title },
      },
    },
  } = props

  return (
    <Layout>
      <Box>
        <Typography variant="h4" component="h4" gutterBottom>
          Tags
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {group.map((tag) => (
            <Chip
              key={tag.fieldValue}
              component={GLink}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              clickable
              label={
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <span>{tag.fieldValue}</span>

                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.75rem",
                      opacity: 0.7,
                    }}
                  >
                    {tag.totalCount}
                  </Box>
                </Box>
              }
            />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
