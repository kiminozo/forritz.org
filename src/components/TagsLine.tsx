import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Stack, Chip } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import kebabCase from "lodash/kebabCase"
import { getMetaId } from "../hooks/useMetaData"

interface Props {
  categories?: string[]
  tags?: string[]
}

const TagsLine = ({ categories, tags }: Props) => (
  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
    {categories &&
      categories.map(category => (
        <Chip
          key={category}
          label={category}
          icon={<BookmarkIcon />}
          component={GatsbyLink}
          to={`/category/${getMetaId(category)}/`}
          color="primary"
          size="small"
          clickable
        />
      ))}
    {tags &&
      tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          component={GatsbyLink}
          to={`/tags/${kebabCase(tag)}/`}
          variant="outlined"
          size="small"
          clickable
        />
      ))}
  </Stack>
)

export default TagsLine