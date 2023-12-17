import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import { SEO, Layout, SideBar, CoverImage } from "../components";
import StaffList, { StaffInfo, StaffLink } from '../components/StaffList'

import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Label, Divider, Item, List, Card
} from 'semantic-ui-react'
import _ from "lodash";
import demo from "../images/demo.png"

interface RecordInfo {
  coverImage: string;
  artist: string;
  recordNo: string;
  recordPrice: string;
  recordPublisher: string;
  recordType: string;
  recordReleaseDate: string;
  categories: string[];
}

interface TemplateProps {
  data: {
    record: {
      frontmatter: RecordInfo & {
        title: string;
        slug: string;
      }
      html: string;
    }
    songs: {
      nodes: {
        frontmatter: StaffInfo & {
          title: string;
          slug: string;
          remarks?: string;
        }
      }[]
    }
  }
}

const MetaItem = ({ meta, name }: { meta: string, name: string }) => (
  name ? <List.Item>{meta}: {name}</List.Item> : <></>
)

const Record = ({ title, info, artist }: { title: string, info: RecordInfo, artist: string }) => (
  <Card.Group centered>
    <Card>
      <CoverImage alt={title} coverimage={info.coverImage} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <Link to={`/discography/${_.kebabCase(artist)}/`}>{artist}</Link>
        </Card.Meta>
        <Card.Description>
          <List>
            <MetaItem meta='编号' name={info.recordNo} />
            <MetaItem meta='唱片类型' name={info.recordType} />
            <MetaItem meta='发售日期' name={info.recordReleaseDate} />
            <MetaItem meta='发行商' name={info.recordPublisher} />
            <MetaItem meta='售价' name={info.recordPrice} />
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
)

export const Head = (props: TemplateProps) => <SEO title={props.data.record.frontmatter.title} />


class RecordTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }



  render() {
    const { record: { frontmatter, html }, songs: { nodes } } = this.props.data; // data.markdownRemark holds your post data
    const { title, slug, artist } = frontmatter;
    const songs = nodes.map(p => p.frontmatter)
    //const artist = [...new Set<string>(songs.flatMap(p => p.singer))]
    return (
      <Layout path={slug}>
        <Grid>
          <Grid.Column mobile={16} computer={4} tablet={4}>
            <Record title={title} artist={artist} info={frontmatter} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={12} tablet={12}>
            <h1>简介</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Divider />
            <h1>曲目列表</h1>
            <List divided relaxed>
              {songs.map(song =>
              (
                <List.Item key={song.slug}>
                  <List.Icon name="music" size="large" color='blue' />
                  <List.Content>
                    <List.Header as="h3">
                      <Link to={song.slug}>{song.title}</Link>
                    </List.Header>
                    <List.Description>
                      <StaffList staff={song} />
                    </List.Description>
                    {
                      song.remarks &&
                      <List.Description>
                        <Label basic color='teal'>{song.remarks}</Label>
                      </List.Description>
                    }
                  </List.Content>
                </List.Item>
              ))
              }
            </List>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default function Template({ data }: TemplateProps) {
  return (<RecordTemplate data={data} />)
}


export const pageQuery = graphql`
  query($id: String!){
    record: markdownRemark(frontmatter: {id: {eq: $id}}) {
      html
      frontmatter {
        id
        slug
        title
        coverImage
        artist
        categories
        recordNo
        recordPrice
        recordPublisher
        recordType
        recordReleaseDate
      }
    }
    songs: allMarkdownRemark(filter: {frontmatter: {type: {eq: "song"}, discographyId: {glob: $id}}}, sort: {fields: frontmatter___order}) {
      nodes {
        frontmatter {
          title
          slug
          songWriter:songwriter
          lyricWriter:lyricwriter
          singer
          arranger
          remarks
        }
      }
    }
  }
`