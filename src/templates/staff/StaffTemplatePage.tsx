import React, { Component } from "react";

import {
  Link as GLink,
  navigate,
} from "gatsby";

import {
  Layout,
  SEO,
  StaffList,
  StaffTabs
} from "../../components";


import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Pagination,
  Typography
} from "@mui/material";

import QueueMusicNoteIcon from '@mui/icons-material/QueueMusic';
import { StaffInfo, StaffType } from "../../components/StaffList";
import { StaffWorks } from "../../components/StaffTab";

interface ArtistCount {
  totalCount: number;
}

export interface TemplateProps {
  title: string
  staffType: StaffType

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

        <List
          disablePadding
          sx={{ my: 1 }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <StaffTabs staffName={title} staffType={staffType} staffWork={data} />
            </ListSubheader>

          }
        >
          {nodes.map(({ song }) => (
            <ListItemButton
              key={song.slug}
              component={GLink}
              to={song.slug}
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
            </ListItemButton>
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

