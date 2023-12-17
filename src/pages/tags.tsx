import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";
import {
    Label, Icon
} from 'semantic-ui-react'
type TagGroup = {
    fieldValue: string;
    totalCount: number;
}

type TagsPageProp = {
    data: {
        allMarkdownRemark: {
            group: TagGroup[]
        },
        site: {
            siteMetadata: {
                title: string
            },
        },
    }
}

export const Head = () => <SEO title="Tags" />


const TagsPage = (props: TagsPageProp) => {
    const {
        data: { allMarkdownRemark: { group },
            site: { siteMetadata: { title } }
        }
    } = props;
    return (
        <Layout>
            <div>
                <h1>Tags</h1>
                <Label.Group >
                    {group.map(tag => (
                        <Label as={Link}
                            key={tag.fieldValue}
                            to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                            {tag.fieldValue}
                            <Label.Detail>{tag.totalCount}</Label.Detail>
                        </Label>
                    ))}
                </Label.Group>
            </div>
        </Layout>
    )
}
export default TagsPage

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(limit: 2000) {
    group(field: {frontmatter: {tags: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`