import React, { Component } from "react"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout, SideBar } from "../components";
import { Header, Divider, List, Button, Icon, Grid, Label } from "semantic-ui-react";


interface TemplateProps {
    pageContext: {
        tag: string;
    }
    data: {
        allMarkdownRemark: {
            totalCount: number
            nodes: {
                frontmatter: {
                    slug: string;
                    title: string
                }
            }[]
        }
    }
};

// Tags.propTypes = {
//     pageContext: PropTypes.shape({
//         tag: PropTypes.string.isRequired,
//     }),
//     data: PropTypes.shape({
//         allMarkdownRemark: PropTypes.shape({
//             totalCount: PropTypes.number.isRequired,
//             edges: PropTypes.arrayOf(
//                 PropTypes.shape({
//                     node: PropTypes.shape({
//                         frontmatter: PropTypes.shape({
//                             title: PropTypes.string.isRequired,
//                         }),
//                         fields: PropTypes.shape({
//                             slug: PropTypes.string.isRequired,
//                         }),
//                     }),
//                 }).isRequired
//             ),
//         }),
//     }),
// }

export const Head = (props: TemplateProps) => <SEO title={props.pageContext.tag} />


const TagsTemplatePage = (props: TemplateProps) => {

    const { pageContext: { tag },
        data: { allMarkdownRemark: { nodes, totalCount } } } = props;
    return (
        <Layout>
            <Grid container stackable>
                <Grid.Column mobile={16} computer={11} tablet={11}>
                    <Header as="h1">
                        {tag}
                        <Label color='teal'>{totalCount}</Label>
                    </Header>
                    <Divider />

                    <List>
                        {nodes.map(({ frontmatter: { slug, title } }) => (
                            <List.Item key={slug}>
                                <Link to={slug}>{title}</Link>
                            </List.Item>
                        ))}
                    </List>
                    <Button as={Link} basic color='blue' to="/tags" icon labelPosition='left'>
                        全部标签
                        <Icon name='arrow left' />
                    </Button>
                </Grid.Column>
                <Grid.Column mobile={16} computer={5} tablet={5} >
                    <SideBar />
                </Grid.Column>
            </Grid>
        </Layout>
    )

}

export default function TagsTemplate({ pageContext, data }: TemplateProps) {
    return (<TagsTemplatePage pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
          frontmatter {
            slug
            title
          }
      }
    }
  }
`