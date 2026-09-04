import BookmarkIcon from "@mui/icons-material/Bookmark"
import { Chip, Stack } from "@mui/material"
import { Link as GLink } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"
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
          component={GLink}
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
          component={GLink}
          to={`/tags/${kebabCase(tag)}/`}
          variant="outlined"
          size="small"
          clickable
        />
      ))}
  </Stack>
)

export default TagsLine