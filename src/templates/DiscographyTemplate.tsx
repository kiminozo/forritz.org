import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link, graphql, PageProps } from "gatsby"
import { SEO, Layout, CoverImage, SideBar } from "../components";
import {
    Card, Divider, Grid, Header
} from 'semantic-ui-react'
import DiscographyLayout, { DiscographyInfo } from "../components/DiscographyLayout";

interface ContextProps {
    pageContext: {
        category: string
    }
}

interface TemplateProps {
    title: string;
    path: string;
    data: {
        records: {
            nodes: {
                frontmatter: DiscographyInfo
            }[],
        }
    }
}

export const Head = (props: TemplateProps) => <SEO title={props.title} />


const DiscographyTemplate = (props: TemplateProps) => {
    const { title, path, data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);
    return (
        <Layout path={path}>
            <Grid>
                <Grid.Column mobile={16} computer={11} tablet={11}>
                    <h1>{title}</h1>
                    <Divider />
                    <DiscographyLayout records={records} />
                </Grid.Column>
                <Grid.Column mobile={16} computer={5} tablet={5} >
                    <SideBar />
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

//export { DiscographyTemplate, TemplateProps };
export default function Template(props: TemplateProps & ContextProps) {
    const category = props.pageContext.category;
    const path = `/discography/${_.kebabCase(category)}/`
    return (<DiscographyTemplate {...props} path={path} title={category} />)
}

export const query = graphql`query ($category: String) {
  records: allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "record"}, categories: {glob: $category}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      frontmatter {
        coverImage
        id
        title
        slug
        artist
        categories
      }
    }
  }
}`
