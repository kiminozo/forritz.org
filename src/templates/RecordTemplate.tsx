import React, { Component } from "react"

import { Link as GLink, graphql } from "gatsby"

import {
  CoverImage,
  Layout,
  SEO,
} from "../components"

import StaffList, {
  StaffInfo,
} from "../components/StaffList"

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material"

import QueueMusicNoteIcon from "@mui/icons-material/QueueMusic"

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
  <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 2 }}>
    <CardMedia
      component="div"
      sx={{
        width: '100%',
      }}
    >
      <CoverImage
        alt={title}
        coverimage={info.coverImage}
        sx={{
          display: 'block',
          width: '100%',
        }}
      />
    </CardMedia>
    <Divider />
    <CardContent>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: "1.5rem",
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        <Link
          color="subtitle1"
          underline="hover"
          component={GLink}
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
              variant="h5"
              component="h5"
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
              variant="h5"
              component="h5"
            >
              曲目列表
            </Typography>

            <List
              disablePadding
              sx={{ mt: 1 }}
            >
              {songs.map((song) => (
                <ListItemButton
                  key={song.slug}
                  alignItems="flex-start"
                  disableGutters
                  component={GLink}
                  to={song.slug}
                  sx={{
                    py: 2,
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: 40,
                      pt: 0.5,
                    }}
                  >
                    <Avatar>
                      <QueueMusicNoteIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    sx={{ mx: 2 }}
                    primary={
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                        }}
                      >
                        <Link
                          color="subtitle1"
                          underline="hover"
                          component={GLink}
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
                      <Box sx={{ mt: 1 }}>
                        <StaffList
                          staff={song}
                        />

                        {song.remarks && (
                          <Box sx={{ mt: 1, fontSize: "0.9rem" }}
                          >
                            {song.remarks}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid>
        </Grid>
      </Layout >
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
