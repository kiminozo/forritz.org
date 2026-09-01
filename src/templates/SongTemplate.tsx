import React from "react"

import { graphql } from "gatsby"

import {
  SEO,
  Layout,
  CC,
  License,
} from "../components"

import RecordGroup from "../components/RecordGroup"

import StaffList, {
  StaffInfo,
} from "../components/StaffList"

import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material"

interface Record {
  discography: string[]
  discographyId: string[]
}

interface MarkdownRemark {
  frontmatter: StaffInfo &
    Record & {
      title: string
      titlech?: string
      slug: string
      date: string
      lang: string
      license?: License
      quote?: string
      remarks?: string
    }

  html: string
}

interface TemplateProps {
  data: {
    markdownRemark: MarkdownRemark

    quoteData: {
      html: string
    }
  }
}

const splitKey = /<\!--\s+翻译\s+-->/g

interface Translator {
  jp: string
  cn: string
}

function split(html: string): Translator {
  const strings = html.split(splitKey)

  if (strings.length === 2) {
    return {
      jp: strings[0],
      cn: strings[1],
    }
  }

  return {
    jp: html,
    cn: "",
  }
}

export const Head = (props: TemplateProps) => (
  <SEO
    title={
      props.data.markdownRemark.frontmatter.title
    }
  />
)

const SongTemplatePage = ({
  data,
}: TemplateProps) => {
  const {
    markdownRemark: {
      frontmatter,
      html,
    },
  } = data

  const {
    title,
    titlech,
    discographyId,
    license,
    slug,
    quote,
  } = frontmatter

  const { quoteData } = data

  const htmlData =
    quote &&
    quoteData &&
    quoteData.html
      ? quoteData.html
      : html

  const { jp, cn } = split(htmlData)

  return (
    <Layout path={slug}>
      <Grid
        container
        columns={16}
        spacing={4}
      >
        {/* Song Content */}
        <Grid size={{ xs: 16, md: 14 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
            >
              {title}
            </Typography>

            {titlech && (
              <Chip
                label={titlech}
                variant="outlined"
                size="medium"
              />
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <StaffList staff={frontmatter} />
          </Box>

          {htmlData && (
            <>
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  fontSize: "1.2rem",
                  borderRadius: 1,
                  backgroundColor:
                    "background.paper",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div
                 
                >
                  {/* Japanese */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      className="song-content"
                      dangerouslySetInnerHTML={{
                        __html: jp,
                      }}
                    />
                  </Grid>

                  {/* Translation Divider */}
                  <Grid
                    size={{ xs: 12, md: 0 }}
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  />

                  {/* Chinese */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      className="song-content"
                      dangerouslySetInnerHTML={{
                        __html: cn,
                      }}
                    />
                  </Grid>
                </div>

                {/* Translation label */}
                {cn && (
                  <Box
                    sx={{
                      position: "relative",
                      display: {
                        xs: "block",
                        md: "none",
                      },
                      my: 3,
                      textAlign: "center",
                    }}
                  >
                    <Divider>
                      翻译
                    </Divider>
                  </Box>
                )}

                {cn && (
                  <Box
                    sx={{
                      position: "absolute",
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              <CC license={license} />
            </>
          )}
        </Grid>

        {/* Discography */}
        <Grid size={{ xs: 16, md: 2 }}>
          <RecordGroup
            discographyId={discographyId}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default function SongTemplate({
  data,
}: TemplateProps) {
  return (
    <SongTemplatePage data={data} />
  )
}

export const query = graphql`
  query ($slug: String!, $quote: String) {
    markdownRemark(
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
      html

      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        titlech

        license {
          type
          author
          translator
          reproduced_url
          reproduced_website
        }

        singer
        songWriter: songwriter
        lyricWriter: lyricwriter
        arranger
        discography
        discographyId
        quote
        remarks
      }
    }

    quoteData: markdownRemark(
      frontmatter: {
        slug: { eq: $quote }
      }
    ) {
      html
    }
  }
`
