import { Box, Container, Divider } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
  path?: string
  children: ReactNode
}

const LayoutQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children, path }: LayoutProps) => {
  const data = useStaticQuery(LayoutQuery)

  return (
    <Box>
      {/* Header */}
      <Header siteTitle={data.site.siteMetadata.title} pathName={path ?? ""} />

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