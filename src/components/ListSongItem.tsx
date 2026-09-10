import React, { Component } from "react";

import {
    Link as GLink,
    navigate,
} from "gatsby";

import {
    Layout,
    SEO,
    StaffList,
    StaffTabs
} from ".";
import {
    Avatar,
    Box,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Pagination,
    Typography
} from "@mui/material";

import QueueMusicNoteIcon from '@mui/icons-material/QueueMusic';
import { StaffInfo, StaffType } from "./StaffList";

interface ListSongInfo extends StaffInfo {
    slug: string
    title: string
    titlech: string
}

const ListSongItem = ({
    song,
}: {
    song: ListSongInfo
}) => (
    <ListItemButton
        component={GLink}
        to={song.slug}
        sx={{
            px: 1,
        }}
    >
        <ListItemAvatar
            sx={{
                minWidth: 40,
                pt: 0.5,
                pr: 2,
            }}
        >
            <Avatar>
                <QueueMusicNoteIcon />
            </Avatar>
        </ListItemAvatar>

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
                        {song.title}
                    </Typography>
                    {song.titlech && (
                        <Typography
                            variant="body2"
                            component="div"
                        >
                            {song.titlech}
                        </Typography>
                    )}
                </Box>
            }
            secondary={
                <Box sx={{ mt: 1 }}>
                    <StaffList
                        key={song.slug}
                        staff={song}
                    />
                </Box>
            }
        />
    </ListItemButton>
)


export { ListSongInfo }
export default ListSongItem