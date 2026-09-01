import React, { Component } from "react"

import { graphql, Link } from "gatsby"

import {
  SEO,
  Layout,
  CoverImage,
} from "../components"

import StaffList, {
  StaffInfo,
} from "../components/StaffList"

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"

import MusicNoteIcon from "@mui/icons-material/MusicNote"

import _ from "lodash"

interface RecordInfo {
  coverImage: string
  artist: string
  recordNo: string
  recordPrice: string
  recordPublisher: string
  recordType: string
  recordReleaseDate: string
  categories: string[]
}

interface TemplateProps {
  data: {
    record: {
      frontmatter: RecordInfo & {
        title: string
        slug: string
      }
      html: string
    }

    songs: {
      nodes: {
        frontmatter: StaffInfo & {
          title: string
          slug: string
          remarks?: string
        }
      }[]
    }
  }
}

const MetaItem = ({
  meta,
  name,
}: {
  meta: string
  name?: string
}) => {
  if (!name) {
    return null
  }

  return (
    <ListItem disableGutters>
      <ListItemText
        primary={`${meta}: ${name}`}
      />
    </ListItem>
  )
}

const Record = ({
  title,
  info,
  artist,
}: {
  title: string
  info: RecordInfo
  artist: string
}) => (
  <Card>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CoverImage
        alt={title}
        coverimage={info.coverImage}
      />
    </Box>

    <CardContent>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: "1.25rem",
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        <Link
          to={`/discography/${_.kebabCase(
            artist
          )}/`}
        >
          {artist}
        </Link>
      </Typography>

      <List dense disablePadding sx={{ mt: 1 }}>
        <MetaItem
          meta="编号"
          name={info.recordNo}
        />

        <MetaItem
          meta="唱片类型"
          name={info.recordType}
        />

        <MetaItem
          meta="发售日期"
          name={info.recordReleaseDate}
        />

        <MetaItem
          meta="发行商"
          name={info.recordPublisher}
        />

        <MetaItem
          meta="售价"
          name={info.recordPrice}
        />
      </List>
    </CardContent>
  </Card>
)

export const Head = (props: TemplateProps) => (
  <SEO
    title={
      props.data.record.frontmatter.title
    }
  />
)

class RecordTemplate extends Component<TemplateProps> {
  render() {
    const {
      record: {
        frontmatter,
        html,
      },
      songs: { nodes },
    } = this.props.data

    const {
      title,
      slug,
      artist,
    } = frontmatter

    const songs = nodes.map(
      (p) => p.frontmatter
    )

    return (
      <Layout path={slug}>
        <Grid container columns={16} spacing={4}>
          {/* Record Information */}
          <Grid size={{ xs: 16, md: 4 }}>
            <Record
              title={title}
              artist={artist}
              info={frontmatter}
            />
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 16, md: 12 }}>
            <Typography
              variant="h1"
              component="h1"
            >
              简介
            </Typography>

            <Box
              className="blog-post-content"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h1"
              component="h1"
            >
              曲目列表
            </Typography>

            <List
              disablePadding
              sx={{ mt: 1 }}
            >
              {songs.map((song) => (
                <ListItem
                  key={song.slug}
                  alignItems="flex-start"
                  divider
                  disableGutters
                  sx={{
                    py: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      pt: 0.5,
                    }}
                  >
                    <MusicNoteIcon
                      color="primary"
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        <Link
                          to={song.slug}
                          style={{
                            textDecoration:
                              "none",
                          }}
                        >
                          {song.title}
                        </Link>
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <StaffList
                          staff={song}
                        />

                        {song.remarks && (
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              label={song.remarks}
                              variant="outlined"
                              color="primary"
                              size="small"
                            />
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default function Template({
  data,
}: TemplateProps) {
  return <RecordTemplate data={data} />
}

export const pageQuery = graphql`
  query ($id: String!) {
    record: markdownRemark(
      frontmatter: {
        id: { eq: $id }
      }
    ) {
      html

      frontmatter {
        id
        slug
        title
        coverImage
        artist
        categories
        recordNo
        recordPrice
        recordPublisher
        recordType
        recordReleaseDate
      }
    }

    songs: allMarkdownRemark(
      filter: {
        frontmatter: {
          type: { eq: "song" }
          discographyId: { glob: $id }
        }
      }
      sort: {
        frontmatter: {
          order: ASC
        }
      }
    ) {
      nodes {
        frontmatter {
          title
          slug
          songWriter: songwriter
          lyricWriter: lyricwriter
          singer
          arranger
          remarks
        }
      }
    }
  }
`
