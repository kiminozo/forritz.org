import { Box, Container, Divider } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
  path?: string
  children: ReactNode
}


const Layout = ({ children, path }: LayoutProps) => {

  return (
    <Box>
      {/* Header */}
      <Header pathName={path ?? ""} />

      {/* Main content */}
      <Container component="main" sx={{ my: 4 }}>
        {children}
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default Layout