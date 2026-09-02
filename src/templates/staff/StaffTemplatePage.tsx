import React, { Component } from "react"

import {
  Link as GLink,
  navigate,
} from "gatsby"

import {
  SEO,
  Layout,
} from "../../components"

import StaffList, {
  StaffInfo,
} from "../../components/StaffList"

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
  Box, Chip,
  Tabs, Tab
} from "@mui/material"

import QueueMusicNoteIcon from '@mui/icons-material/QueueMusic';
import LyricsIcon from '@mui/icons-material/Lyrics';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import TuneIcon from '@mui/icons-material/Tune';

export interface TemplateProps {
  title: string
  staffType: "song-writer" | "lyric-writer" | "singer" | "arranger"

  pageContext: {
    staff: string
    basePath: string
    activePage: number
    totalPages: number
  }

  data: {
    songs: {
      totalCount: number

      nodes: {
        song: StaffInfo & {
          slug: string
          title: string
        }
      }[]
    }
  }
}

function getPath(
  basePath: string,
  activePage: string | number | undefined
) {
  const path =
    activePage === 1 ||
      activePage === "1"
      ? basePath
      : basePath + "/" + activePage

  return path
}

export const Head = (
  props: TemplateProps
) => (
  <SEO title={props.title} />
)

export class StaffTemplatePage extends Component<TemplateProps> {
  render() {
    const {
      title,
      staffType,
      pageContext: {
        basePath,
        activePage,
        totalPages,
      },
      data: {
        songs: {
          nodes,
          totalCount,
        },
      },
    } = this.props

    return (
      <Layout path="songs">
        <Typography
          variant="h4"
          component="h4"
          sx={{ mb: 1 }}
        >
          {title} 的作品
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={staffType} aria-label="staff tabs"
            sx={{
              '& .MuiTab-root': {
                minHeight: 40,
                padding: '0px',
                margin: 0,
              },
            }}>
            <Tab
              value="song-writer"
              icon={<MusicNoteIcon />}
              iconPosition="start"
              label="作曲"
              component={GLink}
              to={`/song-writer/${title}`}
            />
            <Tab
              value="lyric-writer"
              icon={<LyricsIcon />}
              iconPosition="start"
              label="作词"
              component={GLink}
              to={`/lyric-writer/${title}`}
            />
            <Tab
              value="singer"
              icon={<MicIcon />}
              iconPosition="start"
              label="演唱"
              component={GLink}
              to={`/singer/${title}`}
            />
            <Tab
              value="arranger"
              icon={<TuneIcon />}
              iconPosition="start"
              label="编曲"
              component={GLink}
              to={`/arranger/${title}`}
            />
          </Tabs>
        </Box>


        {/* <Typography
          variant="h6"
          component="h6"
          sx={{ mt: 2, mb: 1 }}
        >
          曲目列表
        </Typography> */}

        <List
          disablePadding
          sx={{ mb: 3 }}
        >
          {nodes.map(({ song }) => (
            <ListItem
              key={song.slug}
              divider
              sx={{
                px: 1,
              }}
            >
              <ListItemAvatar
                sx={{
                  minWidth: 40,
                  pt: 0.5,
                  pr: 2,
                }}
              >
                <Avatar>
                  <QueueMusicNoteIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    component={GLink}
                    to={song.slug}
                    variant="h3"
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 500,
                      textDecoration:
                        "none",
                      color: "text.primary",
                      "&:hover": {
                        textDecoration:
                          "underline",
                      },
                    }}
                  >
                    {song.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <StaffList
                      key={song.slug}
                      staff={song}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        {
          totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={activePage}
              color="primary"
              onChange={(_, page) => {
                navigate(
                  getPath(
                    basePath,
                    page
                  )
                )
              }}
              sx={{
                mt: 3,
              }}
            />
          )
        }
      </Layout >
    )
  }
}

