import React, { Component, createRef } from "react"
import { graphql, PageProps, Link } from "gatsby"

import { SEO, Layout, TagsLine, SideBar, CC, License } from "../components";

import {
  Button, Grid, Header, Divider
} from 'semantic-ui-react'
import _ from "lodash";

type TemplateProps = {
  pageContext: {
    slug: string;
    previous?: string,
    next?: string
  }
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        date?: string;
        categories?: string[];
        tags?: string[];
        license?: License
      }
      html: string;
    }
  }
}


const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

export const Head = (props: TemplateProps) => <SEO title={props.data.markdownRemark.frontmatter.title} />


class PostTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }


  renderTags() {
    const { markdownRemark } = this.props.data;
    const { frontmatter } = markdownRemark
    const { categories, tags, license } = frontmatter

    return (
      <>
        <Divider />
        <TagsLine categories={categories} tags={tags} />
        <CC license={license} />
      </>
    )
  }

  render() {
    const { previous, next } = this.props.pageContext;
    const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark


    return (
      <Layout path={frontmatter.slug}>
        <Grid>
          <Grid.Column mobile={16} computer={11} tablet={11}>
            <Header as="h1">{frontmatter.title}</Header>
            <Divider />
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {this.renderTags()}
            <div>
              <Button.Group floated='left' >
                <Button as={Link} to={previous ?? '/'} disabled={!previous} basic color='blue' icon='angle left' content="上一篇" labelPosition='left' />
              </Button.Group>
              <Button.Group floated='right' >
                <Button as={Link} to={next ?? '/'} disabled={!next} basic color='blue' icon='angle right' content="下一篇" labelPosition='right' />
              </Button.Group>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} tablet={5} >
            <SideBar />
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default function Template({ pageContext, data }: TemplateProps) {
  return (<PostTemplate pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        categories
        tags
        license {
          type
          author
          translator
          reproduced_url
          reproduced_website
        }
        
      }
    }
  }
`