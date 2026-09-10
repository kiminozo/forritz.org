import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import React from "react"

import logo from "../assets/logo.svg"
import Navigator from "./Navigator"

type Props = {
  pathName: string
}


export default function Header({ pathName }: Props) {

  return (
    <>
      {/* 顶部 */}
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Logo + 标题 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: 40, marginRight: 16 }}
            />

            <Box>
              <Typography
                variant="h5"
                color="textPrimary"
                sx={{ fontWeight: "bold" }}
              >
                For RITZ
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                岡崎律子的非官方中文资料站
              </Typography>
            </Box>
          </Box>

          {/* 搜索 */}
          {/* <TextField size="small" placeholder="搜索..."
            sx={{ ml: "auto", width: { xs: "100%", sm: 260 }, }}
            slotProps={{
              input: {
                endAdornment: (<InputAdornment position="end"> <IconButton size="small" edge="end"
                  aria-label="搜索" > <SearchIcon /> </IconButton> </InputAdornment>),
              },
            }} /> */}
        </Box>
      </Container>

      {/* 菜单 */}
      <Navigator pathName={pathName} />
    </>
  )
}