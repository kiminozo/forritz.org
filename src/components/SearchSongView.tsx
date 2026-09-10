import React from "react"
import { graphql } from "gatsby"
import {
    Box,
    Container,
    TextField,
    Typography,
} from "@mui/material"
import Fuse from "fuse.js"
import ListSongItem, { ListSongInfo } from "./ListSongItem"
import { useSongData } from "../hooks/useSongData"



export default function SearchSongView() {
    const songs = useSongData()
    const [keyword, setKeyword] = React.useState("")


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
        <Box sx={{ py: 1, px: 3 }}>
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
    )
}