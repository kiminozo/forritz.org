import React, { Component } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { SEO, Layout, CC, License } from "../components";
import RecordGroup from "../components/RecordGroup"
import StaffList, { StaffInfo } from '../components/StaffList'
import {
  Icon, Grid, Header, Container, Segment, Divider,
  Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";



interface Record {
  discography: string[];
  discographyId: string[];
}

interface MarkdownRemark {
  frontmatter: StaffInfo & Record & {
    title: string;
    titlech?: string;
    slug: string;
    date: string;
    lang: string;
    license?: License
    quote?: string;
    remarks?: string
  }
  html: string;
}

interface TemplateProps {
  data: {
    markdownRemark: MarkdownRemark
    quoteData: {
      html: string;
    }
  }
}

const splitKey = /<\!--\s+翻译\s+-->/g

interface Translator {
  jp: string
  cn: string
}

function split(html: string): Translator {
  const strings = html.split(splitKey);
  if (strings && strings.length == 2) {
    return { jp: strings[0], cn: strings[1] }
  } else {
    return { jp: html, cn: "" }
  }
}

export const Head = (props: TemplateProps) => <SEO title={props.data.markdownRemark.frontmatter.title} />


const SongTemplatePage = ({ data }: TemplateProps) => {

  const { markdownRemark: { frontmatter, html } } = data;
  const { title, titlech, discographyId, license, slug, quote, remarks } = frontmatter;
  const { quoteData } = data;
  const htmlData = (quote && quoteData && quoteData.html) ? quoteData.html : html;
  const { jp, cn } = split(htmlData);

  return (
    <Layout path={slug}>
      <Grid>
        <Grid.Column mobile={16} computer={14} tablet={14}>
          <Header as="h1">
            {title}
            {titlech && <Label basic size='large'>{titlech}</Label>}
          </Header>
          <StaffList staff={frontmatter} />
          {htmlData &&
            <>
              <Segment style={{ fontSize: "1.2rem" }} >
                <Grid columns={2} centered stackable>
                  <Grid.Column>
                    <div
                      className="song-content"
                      dangerouslySetInnerHTML={{ __html: jp }}
                    />
                  </Grid.Column>
                  <Divider vertical>翻译</Divider>
                  <Grid.Column>
                    <div
                      className="song-content"
                      dangerouslySetInnerHTML={{ __html: cn }}
                    />

                  </Grid.Column>
                </Grid>
              </Segment>
              <Divider hidden />
              <CC license={license} />
            </>
          }
        </Grid.Column>

        <Grid.Column mobile={16} computer={2} tablet={14}>
          <RecordGroup discographyId={discographyId} />
        </Grid.Column>
      </Grid>
    </Layout >
  )
}

export default function SongTemplate({ data }: TemplateProps) {
  return (<SongTemplatePage data={data} />)
}

export const query = graphql`
  query($slug: String!,$quote: String) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
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
    quoteData: markdownRemark(frontmatter: {slug: {eq: $quote}}) {
      html
    }
  }
`
