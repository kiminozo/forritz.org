import { Link as GatsbyLink } from "gatsby"
import React from "react"
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider
} from "@mui/material"

const Footer = () => (
  <>
    <Divider sx={{ mt: 4 }} />

    <Box component="footer" sx={{ py: 3 }}>
      <Container>
        <Grid container spacing={4}>
          {/* 社区 */}
          <Grid size={{xs:12,sm:6, md:3}}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              社区
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="https://bbs.forritz.org">加入讨论</Link>
              <Link component={GatsbyLink} to="/about">
                特别感谢
              </Link>
              <Link href="/sitemap-index.xml">网站地图</Link>
            </Box>
          </Grid>

          {/* 技术 */}
          <Grid size={{ xs: 12, sm: 6, md:3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              技术
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
              <Link
                href="https://github.com/kiminozo/forritz.org"
                target="_blank"
                rel="noopener"
              >
                Source Code
              </Link>
              <Link
                href="https://react.semantic-ui.com"
                target="_blank"
                rel="noopener"
              >
                Semantic UI React
              </Link>
              <Link
                href="https://www.gatsbyjs.org/"
                target="_blank"
                rel="noopener"
              >
                GatsbyJS
              </Link>
            </Box>
          </Grid>

          {/* 关于 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              关于
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2">
                © 2006-{new Date().getFullYear()}{" "}
                <Link component={GatsbyLink} to="/">
                  For RITZ
                </Link>{" "}
                All rights reserved.
              </Typography>

              <Typography variant="body2">
                Open Source (MIT)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)

export default Footer
