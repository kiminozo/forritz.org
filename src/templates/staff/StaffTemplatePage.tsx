import React, { Component } from "react"

import {
  Link as GLink,
  navigate,
} from "gatsby"

import {
  SEO,
  Layout,
  StaffList,
  StaffTab
} from "../../components"


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
import { StaffInfo } from "../../components/StaffList";
import { StaffWorks } from "../../components/StaffTab";

interface ArtistCount {
  totalCount: number;
}

export interface TemplateProps {
  title: string
  staffType: "song-writer" | "lyric-writer" | "singer" | "arranger"

  pageContext: {
    staff: string
    basePath: string
    activePage: number
    totalPages: number
  }

  data: StaffWorks & {
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
      data
    } = this.props
    const {
      songs: {
        nodes,
      },
    } = data

    return (
      <Layout path="songs">
        <Typography
          variant="h4"
          component="h4"
          sx={{ mb: 1 }}
        >
          {title} 的作品
        </Typography>

        <StaffTab staffName={title} staffType={staffType} staffWork={data} />


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

