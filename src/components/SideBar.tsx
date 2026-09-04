import { Box, Chip, Divider, List, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { Link as GLink, graphql, useStaticQuery } from "gatsby"
import React from "react"
import { getMetaId } from "../hooks/useMetaData"

interface CategoriesGroup {
  fieldValue: string
  totalCount: number
}

interface QueryData {
  record: {
    recordList: CategoriesGroup[]
  }
  post: {
    postList: CategoriesGroup[]
  }
}

const query = graphql`
{
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
}
`

const SideBar = () => {
  const data = useStaticQuery<QueryData>(query)
  const { record: { recordList }, post: { postList } } = data

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      {/* 作品列表 */}
      <List
        component="nav"
        subheader={<ListSubheader component="div">作品列表</ListSubheader>}
      >
        {recordList.map(({ fieldValue, totalCount }) => (
          <ListItemButton
            key={fieldValue}
            component={GLink}
            to={`/discography/${getMetaId(fieldValue)}/`}
          >
            <ListItemText primary={fieldValue} />
            <Chip label={totalCount} color="primary" size="small" />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* 文章分类 */}
      <List
        component="nav"
        subheader={<ListSubheader component="div">文章分类</ListSubheader>}
      >
        {postList.map(({ fieldValue, totalCount }) => (
          <ListItemButton
            key={fieldValue}
            component={GLink}
            to={`/category/${getMetaId(fieldValue)}/`}
          >
            <ListItemText primary={fieldValue} />
            <Chip label={totalCount} color="primary" size="small" />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default SideBar