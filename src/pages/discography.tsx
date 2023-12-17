import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link, graphql, PageProps } from "gatsby"
import { SEO, Layout, CoverImage, SideBar } from "../components";
import {
    Card, Divider, Grid
} from 'semantic-ui-react'
import DiscographyLayout, { DiscographyInfo } from "../components/DiscographyLayout";

interface Props extends PageProps {
    data: {
        records: {
            nodes: {
                frontmatter: DiscographyInfo
            }[],
        }
    }
}

export const Head = () => <SEO title="唱片集" />


const DiscographyPage = (props: Props) => {
    const { data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);

    return (
        <Layout path={props.location.pathname}>
            <Grid>
                <Grid.Column mobile={16} computer={11} tablet={11}>
                    <h1>唱片集</h1>
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
export default DiscographyPage

export const query = graphql`
  {
    records: allMarkdownRemark(filter: {frontmatter: {type: {eq: "record"}}}, sort: {fields: frontmatter___order}) {
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
  }
`