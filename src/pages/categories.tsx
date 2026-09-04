import { Chip, List, ListItemButton, ListItemText, Stack } from "@mui/material"
import { Link as GatsbyLink, graphql } from "gatsby"
import React from "react"
import { Layout, SEO } from "../components"
import { getMetaId } from "../hooks/useMetaData"

type CategoriesGroup = {
  fieldValue: string
  totalCount: number
}

type CategoriesPageProp = {
  data: {
    allMarkdownRemark: {
      group: CategoriesGroup[]
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export const Head = () => <SEO title="Categories" />

const CategoriesPage = (props: CategoriesPageProp) => {
  const {
    data: {
      allMarkdownRemark: { group },
      site: {
        siteMetadata: { title }
      }
    }
  } = props

  return (
    <Layout>
      <div>
        <h1>Categories</h1>
        <List>
          <Stack spacing={1}>
            {group.map(category => (
              <ListItemButton
                key={category.fieldValue}
                component={GatsbyLink}
                to={`/category/${getMetaId(category.fieldValue)}/`}
              >
                <ListItemText primary={category.fieldValue} />
                <Chip
                  label={category.totalCount}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </ListItemButton>
            ))}
          </Stack>
        </List>
      </div>
    </Layout>
  )
}

export default CategoriesPage

export const CategoriesQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(limit: 2000, filter: {frontmatter: {type: {eq: null}}}) {
    group(field: {frontmatter: {categories: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`