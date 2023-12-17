import React from "react"
import { graphql, Link } from "gatsby"

import { SEO, Layout, SideBar, CoverImage } from "../components";

import {
  Grid, Header, Divider, Item, List
} from 'semantic-ui-react'
import _ from "lodash";

interface RecordInfo {
  id: string;
  coverImage: string;
  recordNo: string;
  recordPrice: string;
  recordPublisher: string;
  recordType: string;
  recordReleaseDate: string;
}

interface SongInfo {
  slug: string;
  title: string;
  singer: string;
  discographyId: string[]
}

interface TemplateProps {
  pageContext: {
    categories: string[]
    artist: string
    title: string
  }
  data: {
    records: {
      totalCount: number;
      recordGroup: {
        frontmatter: RecordInfo & {
          slug: string
          title: string
        }
      }[]
    }
    songs: {
      totalCount: number;
      songGroup: {
        frontmatter: SongInfo;
      }[]
    }
  }
}

export const Head = (props: TemplateProps) => <SEO title={props.pageContext.title} />


const RecordListTemplate = (props: TemplateProps) => {
  const { pageContext: { artist, title }, data } = props;
  const { records: { recordGroup }, songs: { songGroup } } = data;
  const records = recordGroup.map(p => p.frontmatter);
  const songs = songGroup.map(p => p.frontmatter);
  return (
    <Layout path={`/discography/${_.kebabCase(title)}/`}>
      <Grid>
        <Grid.Column mobile={16} computer={11} tablet={11}>
          <Header as="h1">{title}</Header>
          <Divider />

          <Item.Group divided relaxed>
            {
              records.map(({ title, id, slug, coverImage, recordPublisher, recordReleaseDate }) => {
                return (
                  <Item key={id}>
                    <Item.Image size="small" as={Link} to={slug}>
                      <CoverImage alt={title} bordered rounded size="small" coverimage={coverImage} />
                    </Item.Image>
                    <Item.Content>
                      <Item.Header as={Link} to={slug}>{title}</Item.Header>
                      <Item.Meta>
                        <Link to={`/singer/${_.kebabCase(artist)}`}>{artist}</Link>
                        {" | "}
                        {recordReleaseDate}
                        {" | "}
                        {recordPublisher}
                      </Item.Meta>
                      <Item.Description>
                        <List ordered selection relaxed>
                          {
                            songs.filter(p => p.discographyId.includes(id))
                              .map(({ title, slug }) => (
                                <List.Item as={Link} key={title} to={slug}>
                                  {title}
                                </List.Item>
                              ))
                          }
                        </List>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                )
              })
            }
          </Item.Group>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={5} >
          <SideBar />
        </Grid.Column>
      </Grid>
    </Layout >
  )
}

export default function Template(props: TemplateProps) {
  return (<RecordListTemplate {...props} />)
}

export const pageQuery = graphql`
query ($categories: [String], $artist:String, $discographyIds:[String]) {
  records: allMarkdownRemark(
      sort: {fields: [frontmatter___order], order: ASC}, 
      filter: {frontmatter: {categories: {in: $categories}, artist: {eq: $artist}}}) {
    totalCount
    recordGroup: nodes {
      frontmatter {
        id
        slug
        title
        coverImage
        recordNo
        recordPrice
        recordPublisher
        recordType
        recordReleaseDate
      }
    }
  }

  songs:allMarkdownRemark(sort: {fields: [frontmatter___order], order: ASC}, filter: {frontmatter: {type: {eq: "song"}, discographyId: {in: $discographyIds}}}) {
          totalCount
    songGroup: nodes {
          frontmatter {
            slug
            title
            singer
            discographyId
      }
    }
  }
}

`