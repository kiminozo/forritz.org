import React from "react"

import { Link as GLink, graphql } from "gatsby"

import {
  Layout,
  SEO,
  SideBar
} from "../components"

import {
  Box,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material"
import AlbumCard from "../components/AlbumCard"

import _ from "lodash"

interface RecordInfo {
  id: string
  coverImage: string
  recordNo: string
  recordPrice: string
  recordPublisher: string
  recordType: string
  recordReleaseDate: string
}

interface SongInfo {
  slug: string
  title: string
  singer: string
  discographyId: string[]
}

interface TemplateProps {
  pageContext: {
    categories: string[]
    artist: string
    title: string
  }

  data: {
    records: {
      totalCount: number
      recordGroup: {
        frontmatter: RecordInfo & {
          slug: string
          title: string
        }
      }[]
    }

    songs: {
      totalCount: number
      songGroup: {
        frontmatter: SongInfo
      }[]
    }
  }
}

export const Head = (props: TemplateProps) => (
  <SEO title={props.pageContext.title} />
)

const RecordListTemplate = (props: TemplateProps) => {
  const {
    pageContext: { artist, title },
    data,
  } = props

  const {
    records: { recordGroup },
    songs: { songGroup },
  } = data

  const records = recordGroup.map(
    (p) => p.frontmatter
  )

  const songs = songGroup.map(
    (p) => p.frontmatter
  )

  return (
    <Layout
      path={`/discography/${_.kebabCase(title)}/`}
    >
      <Grid container columns={16} spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 16, md: 11 }}>
          <Typography
            variant="h4"
            component="h4"
          >
            {title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box>
            {records.map(
              ({
                title,
                id,
                slug,
                coverImage,
                recordPublisher,
                recordReleaseDate,
              }) => {
                const recordSongs = songs.filter(
                  (song) =>
                    song.discographyId.includes(id)
                )

                return (
                  <Box
                    key={id}
                    sx={{
                      display: "flex",
                      gap: 3,
                      py: 3,
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    {/* Cover Image */}
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 160,
                      }}
                    >
                      <AlbumCard coverImage={coverImage} slug={slug} title={title} />
                    </Box>

                    {/* Record Content */}
                    <Box
                      sx={{
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      {/* Record Title */}
                      <Typography
                        variant="h4"
                        component={GLink}
                        to={slug}
                        sx={{
                          display: "inline-block",
                          fontSize: "1.5rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          color: "text.primary",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {title}
                      </Typography>

                      {/* Artist / Release Date / Publisher */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        <Link
                          color="secondary"
                          underline="hover"
                          component={GLink}
                          to={`/singer/${_.kebabCase(
                            artist
                          )}/`}
                        >
                          {artist}
                        </Link>

                        {" | "}

                        {recordReleaseDate}

                        {" | "}

                        {recordPublisher}
                      </Typography>

                      {/* Songs */}
                      {recordSongs.length > 0 && (
                        <List
                          sx={{
                            mt: 1,
                            mb: 0,
                          }}
                        >
                          {recordSongs.map(
                            ({
                              title,
                              slug,
                            }, index) => (
                              <ListItem
                                key={slug}
                                disablePadding
                              >
                                <ListItemIcon>
                                  <Chip label={index + 1} size="small" />
                                </ListItemIcon>
                                <ListItemButton
                                  component={GLink}
                                  to={slug}
                                  sx={{
                                    py: 0.25,
                                    px: 0.5,
                                  }}
                                >
                                  <ListItemText
                                    primary={title}
                                  />
                                </ListItemButton>
                              </ListItem>
                            )
                          )}
                        </List>
                      )}
                    </Box>
                  </Box>
                )
              }
            )}
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 16, md: 5 }}>
          <SideBar />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function Template(
  props: TemplateProps
) {
  return (
    <RecordListTemplate {...props} />
  )
}

export const pageQuery = graphql`
  query (
    $categories: [String]
    $artist: String
    $discographyIds: [String]
  ) {
    records: allMarkdownRemark(
      sort: {
        frontmatter: {
          order: ASC
        }
      }
      filter: {
        frontmatter: {
          categories: {
            in: $categories
          }
          artist: {
            eq: $artist
          }
        }
      }
    ) {
      totalCount

      recordGroup: nodes {
        frontmatter {
          id
          slug
          title
          coverImage
          recordNo
          recordPrice
          recordPublisher
          recordType
          recordReleaseDate
        }
      }
    }

    songs: allMarkdownRemark(
      sort: {
        frontmatter: {
          order: ASC
        }
      }
      filter: {
        frontmatter: {
          type: {
            eq: "song"
          }
          discographyId: {
            in: $discographyIds
          }
        }
      }
    ) {
      totalCount

      songGroup: nodes {
        frontmatter {
          slug
          title
          singer
          discographyId
        }
      }
    }
  }
`
