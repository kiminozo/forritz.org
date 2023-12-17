import React from "react"
import { Menu, Label } from "semantic-ui-react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { getMetaId } from "../hooks/useMetaData"

interface CategoriesGroup {
    fieldValue: string;
    totalCount: number;
}


interface QueryData {
    record: {
        recordList: CategoriesGroup[]
    },
    post: {
        postList: CategoriesGroup[]
    }
    metas: {
        metaList: {
            frontmatter: {
                title: string
                id: string
            }
        }
    }
}

const query = graphql`{
  record: allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {type: {eq: "record"}}}
  ) {
    recordList: group(field: {frontmatter: {categories: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  post: allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {type: {ne: "record"}}}
  ) {
    postList: group(field: {frontmatter: {categories: SELECT}}) {
      fieldValue
      totalCount
    }
  }
}`




const SideBar = () => {
    const data = useStaticQuery<QueryData>(query);
    const { record: { recordList }, post: { postList } } = data;
    return (
        <Menu vertical size='massive'>
            <Menu.Item>
                <Menu.Header>作品列表</Menu.Header>
                <Menu.Menu>
                    {
                        recordList.map(({ fieldValue, totalCount }) => (
                            <Menu.Item as={Link} key={fieldValue} to={`/discography/${getMetaId(fieldValue)}/`} >
                                {fieldValue}
                                <Label color='teal' circular>{totalCount} </Label>
                            </Menu.Item>
                        ))
                    }
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>文章分类</Menu.Header>
                <Menu.Menu>
                    {
                        postList.map(({ fieldValue, totalCount }) => (
                            <Menu.Item as={Link} key={fieldValue} to={`/category/${getMetaId(fieldValue)}/`} >
                                {fieldValue}
                                <Label color='teal' circular >{totalCount} </Label>
                            </Menu.Item>
                        ))
                    }
                </Menu.Menu>
            </Menu.Item>
        </Menu>
    )
}

export default SideBar;