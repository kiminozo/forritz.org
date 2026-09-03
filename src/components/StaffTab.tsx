import React from "react"
import { Link as GLink, graphql, useStaticQuery, } from "gatsby"
import { Stack, Avatar, Link, Badge, Box, Tabs, Tab } from "@mui/material"


import LyricsIcon from '@mui/icons-material/Lyrics';
import PianoIcon from '@mui/icons-material/Piano';
import MicIcon from '@mui/icons-material/Mic';
import TuneIcon from '@mui/icons-material/Tune';

interface StaffTabProp {
    staffName: String
    staffType: "song-writer" | "lyric-writer" | "singer" | "arranger"
    staffWork: StaffWorks
}

interface ArtistCount {
    totalCount: number;
}

interface StaffWorks {
    singer: ArtistCount;
    songWriter: ArtistCount;
    lyricWriter: ArtistCount;
    arranger: ArtistCount;
}


const StaffTab = (props: StaffTabProp) => {
    const { staffName, staffType, staffWork } = props;

    return (<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={staffType} aria-label="staff tabs"
            sx={{
                padding: 0,
                margin: 0,
                '& .MuiTab-root': {
                    minHeight: 8,
                    px: 2
                },
            }}>
            <Tab
                value="song-writer"
                icon={<PianoIcon />}
                iconPosition="start"
                label={`作曲(${staffWork.lyricWriter.totalCount})`}
                component={GLink}
                to={`/song-writer/${staffName}`}
                disabled={staffWork.songWriter.totalCount == 0}
            />
            <Tab
                value="lyric-writer"
                icon={<LyricsIcon />}
                iconPosition="start"
                label={`作词(${staffWork.lyricWriter.totalCount})`}
                component={GLink}
                to={`/lyric-writer/${staffName}`}
                disabled={staffWork.lyricWriter.totalCount == 0}
            />
            <Tab
                value="singer"
                icon={<MicIcon />}
                iconPosition="start"
                label={`演唱(${staffWork.singer.totalCount})`}
                component={GLink}
                to={`/singer/${staffName}`}
                disabled={staffWork.singer.totalCount == 0}

            />
            <Tab
                value="arranger"
                icon={<TuneIcon />}
                iconPosition="start"
                label={`编曲(${staffWork.arranger.totalCount})`}
                component={GLink}
                to={`/arranger/${staffName}`}
                disabled={staffWork.arranger.totalCount == 0}

            />
        </Tabs>
    </Box >
    )
}

export { StaffWorks }
export default StaffTab