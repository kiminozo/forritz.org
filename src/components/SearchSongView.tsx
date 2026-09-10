import React from "react"

import {
    Box,
    ClickAwayListener,
    Paper,
    Popper,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

import Fuse from "fuse.js"

import ListSongItem, { ListSongInfo } from "./ListSongItem"
import { useSongData } from "../hooks/useSongData"

export default function SearchSongView() {
    const songs = useSongData()

    const [keyword, setKeyword] = React.useState("")
    const [anchorEl, setAnchorEl] =
        React.useState<HTMLElement | null>(null)

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
                includeMatches: true,
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

    const open = Boolean(anchorEl) && keyword.trim() !== ""

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box sx={{ py: 1, px: 3 }}>
                <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    placeholder="搜索歌曲、演唱者、作曲者……"
                    value={keyword}
                    onFocus={event => setAnchorEl(event.currentTarget)}
                    onChange={event => {
                        setKeyword(event.target.value)
                        setAnchorEl(event.currentTarget)
                    }}
                    slotProps={{
                        input: {
                            endAdornment: keyword && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setKeyword("")
                                        }}
                                        edge="end"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={{
                        zIndex: theme => theme.zIndex.modal,
                        width: anchorEl?.clientWidth,
                    }}
                    modifiers={[
                        {
                            name: "offset",
                            options: {
                                offset: [0, 8],
                            },
                        },
                    ]}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            maxHeight: "70vh",
                            overflow: "auto",
                            py: 1,
                        }}
                    >
                        {results.length > 0 ? (
                            results.map(({ item, matches }) => (
                                <ListSongItem
                                    key={item.slug}
                                    song={item}
                                    matches={matches}
                                />
                            ))
                        ) : (
                            <Box
                                sx={{
                                    px: 2,
                                    py: 3,
                                    textAlign: "center",
                                    color: "text.secondary",
                                }}
                            >
                                没有找到相关歌曲
                            </Box>
                        )}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    )
}