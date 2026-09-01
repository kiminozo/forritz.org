import React from "react"

import { Link, graphql, navigate } from "gatsby"

import { SEO, Layout, SideBar, TagsLine } from "../components"

import { Box, Chip, Divider, Grid, Pagination, Typography } from "@mui/material"

interface TemplateProps {
  pageContext: {
    category: string
    basePath: string
    activePage: number
    totalPages: number
  }

  data: {
    meta: {
      frontmatter: {
        id: string
        title: string
      }
      info: string
    }

    posts: {
      totalCount: number

      nodes: {
        frontmatter: {
          slug: string
          title: string
          categories: string[]
          tags: string[]
        }
        excerpt: string
      }[]
    }
  }
}

function getPath(
  basePath: string,
  activePage: string | number | undefined
) {
  return activePage === 1 || activePage === "1"
    ? basePath
    : `${basePath}/${activePage}`
}

export const Head = (props: TemplateProps) => (
  <SEO title={props.pageContext.category} />
)

const CategoriesTemplatePage = (props: TemplateProps) => {
  const {
    pageContext: {
      category,
      basePath,
      activePage,
      totalPages,
    },
    data: {
      meta: { info },
      posts: { totalCount, nodes },
    },
  } = props

  return (
    <Layout path={getPath(basePath, 1)}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Category Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h1" component="h1">
              {category}
            </Typography>

            <Chip
              label={totalCount}
              color="primary"
              size="small"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Introduction */}
          <Typography variant="h2" component="h2">
            简介
          </Typography>

          <Box
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: info }}
            sx={{ mt: 2 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Article List */}
          <Typography variant="h2" component="h2">
            文章列表
          </Typography>

          <Box sx={{ mt: 2 }}>
            {nodes.map(
              ({
                frontmatter: { slug, title, tags },
                excerpt,
              }) => (
                <Box
                  key={slug}
                  sx={{
                    py: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 500,
                    }}
                  >
                    <Link
                      to={slug}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {title}
                    </Link>
                  </Typography>

                  <Typography
                    component="p"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {excerpt}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <TagsLine tags={tags} />
                  </Box>
                </Box>
              )
            )}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <>
              <Divider sx={{ my: 3 }} />

              <Pagination
                page={activePage}
                count={totalPages}
                onChange={(_, page) => {
                  navigate(getPath(basePath, page))
                }}
                hidePrevButton={activePage === 1}
                hideNextButton={activePage === totalPages}
              />
            </>
          )}

          {/* 
          <Link to="/categories">
            All Categories
          </Link>
          */}
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SideBar />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function CategoriesTemplate({
  pageContext,
  data,
}: TemplateProps) {
  return (
    <CategoriesTemplatePage
      pageContext={pageContext}
      data={data}
    />
  )
}

export const query = graphql`
  query ($category: String, $skip: Int!, $limit: Int!) {
    meta: markdownRemark(
      frontmatter: {
        type: { eq: "meta" }
        title: { eq: $category }
      }
    ) {
      frontmatter {
        id
        title
      }

      info: html
    }

    posts: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { slug: ASC } }
      filter: {
        frontmatter: {
          categories: { in: [$category] }
        }
      }
    ) {
      totalCount

      nodes {
        frontmatter {
          slug
          title
          categories
          tags
        }

        excerpt(truncate: true)
      }
    }
  }
`
