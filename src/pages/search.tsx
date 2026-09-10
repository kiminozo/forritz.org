import React from "react"
import { graphql } from "gatsby"
import {
    Box,
    Container,
    TextField,
    Typography,
} from "@mui/material"
import Fuse from "fuse.js"
import { Layout } from "../components"
import ListSongItem, { ListSongInfo } from "../components/ListSongItem"



interface Props {
    data: {
        songs: {
            nodes: {
                id: string
                frontmatter: ListSongInfo
            }[]
        }
    }
}

export default function SearchView({ data }: Props) {
    const [keyword, setKeyword] = React.useState("")

    const songs: ListSongInfo[] = data.songs.nodes.map(node => ({
        id: node.id,
        ...node.frontmatter,
    }))

    const fuse = React.useMemo(
        () =>
            new Fuse(songs, {
                keys: [
                    { name: "title", weight: 0.4 },
                    { name: "titlech", weight: 0.3 },
                    { name: "vocal", weight: 0.15 },
                    { name: "composer", weight: 0.1 },
                    { name: "lyricist", weight: 0.05 },
                    { name: "arranger", weight: 0.05 },
                ],
                threshold: 0.4,
                ignoreLocation: true,
                includeMatches: true
            }),
        [songs]
    )

    const results = React.useMemo(() => {
        const value = keyword.trim()

        if (!value) {
            return []
        }

        return fuse.search(value)
    }, [fuse, keyword])

    return (
        <Layout path="search">
            <Box sx={{ py: 1, minHeight: "400px" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    搜索
                </Typography>

                <TextField
                    fullWidth
                    autoFocus
                    placeholder="搜索歌曲、演唱者、作曲者……"
                    value={keyword}
                    onChange={event => setKeyword(event.target.value)}
                />

                <Box sx={{ mt: 3 }}>
                    {results.map(({ item, matches }) => (
                        <ListSongItem key={item.slug} song={item} matches={matches}
                        />
                    ))}
                </Box>
            </Box>
        </Layout>
    )
}

export const query = graphql`
  query SearchPage {
    songs: allMarkdownRemark(
      filter: {
        frontmatter: {
          type: { eq: "song" }
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          titlech
          vocal
          composer
          lyricist
          arranger
          slug
        }
      }
    }
  }
`