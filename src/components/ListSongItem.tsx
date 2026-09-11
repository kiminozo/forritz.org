import React from "react";

import {
    Link as GLink
} from "gatsby";

import {
    Avatar,
    Box,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {
    CoverImage,
    StaffList
} from ".";

import QueueMusicNoteIcon from '@mui/icons-material/QueueMusic';
import type { FuseResultMatch } from "fuse.js";
import HighlightText, { findIndices, IResultMatch } from "./HighlightText";
import { StaffInfo } from "./StaffList";
import { useRecordsData } from "../hooks/useRecordsData";

interface ListSongInfo extends StaffInfo {
    slug: string
    title: string
    titlech: string
    discographyId?: string[]
}


interface ListSongItemProps extends IResultMatch {
    song: ListSongInfo
}

const SongIcon = ({ discographyId }: { discographyId?: string[] }) => {
    const records = useRecordsData()

    const record = (discographyId && discographyId.length > 0) ? records.filter(p => discographyId.includes(p.id))?.[0] : null


    if (!record) {
        return (
            <ListItemAvatar>
                <Avatar>
                    <QueueMusicNoteIcon />
                </Avatar>
            </ListItemAvatar>
        )
    }

    return (
        <ListItemAvatar>
            <Avatar variant="rounded">
                <CoverImage
                    coverimage={record.coverImage}
                    scales="avatar"
                />
            </Avatar>
        </ListItemAvatar>
    )


}

const ListSongItem = ({
    song,
    matches
}: ListSongItemProps) => {
    const titleIndices = findIndices("title", matches)
    const titlechIndices = findIndices("titlech", matches)

    return (< ListItemButton
        component={GLink}
        to={song.slug}
        sx={{
            px: 1,
        }
        }
    >
        <SongIcon discographyId={song.discographyId} />
        <ListItemText
            primary={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        component={GLink}
                        to={song.slug}
                        variant="h3"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            textDecoration:
                                "none",
                            color: "text.primary",

                        }}
                    >
                        <HighlightText
                            text={song.title}
                            indices={titleIndices}
                        />
                    </Typography>
                    {song.titlech && (
                        <Typography
                            variant="body2"
                            component="div"
                        >
                            <HighlightText
                                text={song.titlech}
                                indices={titlechIndices}
                            />
                        </Typography>
                    )}
                </Box>
            }
            secondary={
                <Box sx={{ mt: 1 }}>
                    <StaffList
                        key={song.slug}
                        staff={song}
                        matches={matches}
                    />
                </Box>
            }
        />
    </ListItemButton >
    )
}


export { ListSongInfo };
export default ListSongItem