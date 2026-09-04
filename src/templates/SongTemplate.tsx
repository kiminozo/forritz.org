import React from "react"

import { graphql } from "gatsby"

import {
  CC,
  Layout,
  SEO,
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
import { License } from "../components/CC"

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
        columns={12}
        spacing={4}
      >
        {/* Song Content */}
        <Grid size={{ xs: 12, md: 10 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              component="h4"
            >
              {title}
            </Typography>

            {titlech && (
              <Typography
                variant="subtitle1"
                component="h6"
              >
                {titlech}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <StaffList staff={frontmatter} />
          </Box>

          {htmlData && (
            <>
              <Box
                sx={{
                  mt: 2,
                  p: 1,
                  fontSize: "1.2rem",
                  borderRadius: 1,
                  backgroundColor:
                    "background.paper",
                }}
              >
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        md: 'row',
                      },
                      alignItems: {
                        xs: 'stretch',
                        md: 'center',
                      },
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: '40%',
                        },
                      }}
                      className="song-content"
                      dangerouslySetInnerHTML={{
                        __html: jp,
                      }}
                    />


                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        mx: 1,
                      }}>
                      <Chip label="翻译" size="small" />
                    </Divider>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: '40%',
                        },
                      }}
                      className="song-content"
                      dangerouslySetInnerHTML={{
                        __html: cn,
                      }}
                    />
                  </Box>

                </div>

                {/* Translation label */}

                {cn && (
                  <Box
                    sx={{
                      position: "absolute",
                      backgroundColor: "red",
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
      </Grid >
    </Layout >
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
