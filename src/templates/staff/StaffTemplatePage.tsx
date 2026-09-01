import React, { Component } from "react"

import {
  Link,
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material"

import MusicNoteIcon from "@mui/icons-material/MusicNote"

export interface TemplateProps {
  title: string

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
          variant="h1"
          component="h1"
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 2 }}
        >
          曲目列表
        </Typography>

        <List
          disablePadding
          sx={{ mb: 3 }}
        >
          {nodes.map(({ song }) => (
            <ListItem
              key={song.slug}
              divider
              disablePadding
              alignItems="flex-start"
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  pt: 1.5,
                }}
              >
                <MusicNoteIcon
                  color="primary"
                />
              </ListItemIcon>

              <ListItemButton
                component="div"
                disableGutters
                sx={{
                  display: "block",
                  py: 1.5,
                  px: 0,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      component={Link}
                      to={song.slug}
                      variant="h3"
                      sx={{
                        display: "block",
                        fontSize: "1.1rem",
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
                    <StaffList
                      key={song.slug}
                      staff={song}
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {totalPages > 1 && (
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
        )}
      </Layout>
    )
  }
}

