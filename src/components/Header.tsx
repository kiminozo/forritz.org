import {
  Box,
  Container,
  Typography
} from "@mui/material"
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
        <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 16 }} />
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
      <Navigator pathName={pathName} />
    </>
  )
}