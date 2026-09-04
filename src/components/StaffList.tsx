import { Chip, Link, Stack } from "@mui/material";
import { Link as GLink } from "gatsby";
import React from "react";

import LyricsIcon from '@mui/icons-material/Lyrics';
import MicIcon from '@mui/icons-material/Mic';
import PianoIcon from '@mui/icons-material/Piano';
import TuneIcon from '@mui/icons-material/Tune';

export type StaffType =
  | "song-writer"
  | "lyric-writer"
  | "singer"
  | "arranger"

interface StaffInfo {
  songWriter: string[]
  lyricWriter: string[]
  singer: string[]
  arranger: string[]
}

interface StaffIconProps {
  type: StaffType
}

const StaffIcon = ({ type }: StaffIconProps) => {
  switch (type) {
    case "song-writer":
      return <PianoIcon />

    case "lyric-writer":
      return <LyricsIcon />

    case "singer":
      return <MicIcon />

    case "arranger":
      return <TuneIcon />
  }
}


const StaffLinks = ({ type, names }: { type: StaffType; names: string[] }) => (
  <Chip
    variant="outlined" size="small"
    label={<StaffLink type={type} names={names} />}
    avatar={<StaffIcon type={type} />}
  />
)


const StaffLink = ({ type, names }: { type: string; names: string[] }) => (
  <>
    {names.map((name, i, arr) => {
      const path = `/${type}/${name}`
      return (
        <React.Fragment key={path}>
          <Link
            component={GLink}
            to={path}
            underline="hover"
            color="inherit"
            variant="body2"
          >
            {name}
          </Link>
          {i !== arr.length - 1 ? " " : null}
        </React.Fragment>
      )
    })}
  </>
)

const StaffList = ({ staff: { songWriter, lyricWriter, singer, arranger } }: { staff: StaffInfo }) => (
  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
    {songWriter.length > 0 && (
      //songWriter
      <StaffLinks type="song-writer" names={songWriter} />
    )}
    {lyricWriter.length > 0 && (
      <StaffLinks type="lyric-writer" names={lyricWriter} />
    )}
    {singer.length > 0 && (
      <StaffLinks type="singer" names={singer} />
    )}
    {arranger.length > 0 && (
      <StaffLinks type="arranger" names={arranger} />
    )}
  </Stack>
)



export { StaffIcon, StaffInfo };
export default StaffList