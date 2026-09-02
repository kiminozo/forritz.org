import React from "react"
import { Link } from "gatsby"
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
  Tabs,
  Tab
} from "@mui/material"

import logo from "../assets/logo.jpg"
import { menusConfig, MenuConfig } from "../menu"
import _ from "lodash"

type Props = {
  siteTitle: string
  pathName: string
}

function getPath(pathName: string) {
  const start = pathName.startsWith("/") ? 1 : 0
  const end = pathName.endsWith("/") ? pathName.length - 1 : pathName.length
  return pathName.substring(start, end)
}

function isActive(item: MenuConfig, pathName: string): boolean {
  const path = getPath(pathName)
  const dir = path.split("/")[0]

  const part = (array?: string[]) =>
    array ? _.findIndex(array, x => x === dir) >= 0 : false

  if (item.sub) {
    return (
      _.findIndex(item.sub, p => getPath(p.link) === path) >= 0 ||
      _.findIndex(item.sub, p => part(p.active)) >= 0
    )
  }

  return (
    item.link === pathName ||
    getPath(item.link) === dir ||
    part(item.active)
  )
}

export default function Header({ siteTitle, pathName }: Props) {
  const menus = menusConfig

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget)
    setOpenIndex(index)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenIndex(null)
  }

  return (
    <>
      {/* 顶部 */}
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
          <img src={logo} style={{ height: 60, marginRight: 16 }} />
          <Box>
            <Typography variant="h5" color="textPrimary" sx={{ fontWeight: "bold" }}>
              For RITZ
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              岡崎律子的非官方中文资料站
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* 菜单 */}
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={menus.findIndex(item => isActive(item, pathName))}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="nav tabs">
            {menus.map((item, index) =>
              item.sub ? (
                <Tab key={item.name} label={item.name} />
              ) : (
                <Tab
                  value={index}
                  key={item.name}
                  label={item.name}
                  component={Link}
                  to={item.link}
                />
              )
            )}
          </Tabs>
        </Box>
      </Container>
      {/* <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Container sx={{ display: "flex" }}>
            {menus.map((item, index) =>
              item.sub ? (
                <Box key={item.name}>
                  <Button
                    onClick={(e) => handleOpen(e, index)}
                    color={isActive(item, pathName) ? "primary" : "inherit"}
                  >
                    {item.name}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={openIndex === index}
                    onClose={handleClose}
                  >
                    {item.sub.map(sub => (
                      <MenuItem
                        key={sub.name}
                        component={Link}
                        to={sub.link}
                        onClick={handleClose}
                      >
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.link}
                  color={isActive(item, pathName) ? "primary" : "inherit"}
                >
                  {item.name}
                </Button>
              )
            )}
          </Container>
        </Toolbar>
      </AppBar> */}
    </>
  )
}