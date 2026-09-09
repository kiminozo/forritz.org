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
  Stack
} from "@mui/material"
import { License } from "../components/CC"

interface SongFields {
  frontmatter: StaffInfo & {
    title: string
    titlech?: string
    slug: string
    date: string
    //discography: string[]
    discographyId: string[]
    quote?: string
    remarks?: string
    license?: License
  }
}

interface SongData extends SongFields {
  html: string
}

interface TemplateProps {
  data: {
    markdownRemark: SongData
    quoteData?: SongData
    anotherSongs: {
      nodes: SongFields[]
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

const LyricView = ({ title, titlech, staff, htmlData }: {
  title: string,
  titlech?: string,
  staff: StaffInfo,
  htmlData: string
}) => {
  const { jp, cn } = split(htmlData)

  return <Grid>
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
      <StaffList staff={staff} />
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
      </>
    )}
  </Grid>
}

const SongTemplatePage = ({
  data,
}: TemplateProps) => {
  const {
    markdownRemark: {
      frontmatter,
      html,
    },
    anotherSongs
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

  const quotes = quoteData?.frontmatter.discographyId ?? []
  const anothers = anotherSongs.nodes.flatMap(p => p.frontmatter.discographyId)
  const otherId = [...quotes, ...anothers]

  const htmlData =
    quote &&
      quoteData &&
      quoteData.html
      ? quoteData.html
      : html


  return (
    <Layout path={slug}>
      <Stack spacing={4}>
        {/* Song Content */}
        <LyricView
          title={title}
          titlech={titlech}
          staff={frontmatter}
          htmlData={htmlData}
        />

        {/* Discography */}
        <Divider />

        <RecordGroup discographyId={discographyId} otherId={otherId} />

        <Divider />

        <CC license={license} />
      </Stack>
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
    ...SongFields
    html
  }

  quoteData: markdownRemark(
    frontmatter: {
      slug: { eq: $quote }
    }
  ) {
    ...SongFields
    html
  }

  anotherSongs: allMarkdownRemark(
    filter: {
      frontmatter: {
        quote: { eq: $slug }
      }
    }
  ) {
    nodes {
      ...SongFields
    }
  }
}

fragment SongFields on MarkdownRemark {
  frontmatter {
    title
    titlech
    slug
    date(formatString: "MMMM DD, YYYY")
    vocal
    composer
    lyricist
    arranger
    discography
    discographyId
    quote
    remarks
    license {
        type
        author
        translator
        reproduced_url
        reproduced_website
    }
  }
}
`
