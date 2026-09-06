import { Chip, Link, Stack } from "@mui/material";
import { Link as GLink } from "gatsby";
import React from "react";

import LyricsIcon from '@mui/icons-material/Lyrics';
import MicIcon from '@mui/icons-material/Mic';
import PianoIcon from '@mui/icons-material/Piano';
import TuneIcon from '@mui/icons-material/Tune';

export type StaffType =
  | "composer"
  | "lyricist"
  | "vocal"
  | "arranger"

export const StaffTypeName: Record<StaffType, string> = {
  composer: "作曲",
  lyricist: "作词",
  vocal: "演唱",
  arranger: "编曲",
};

interface StaffInfo {
  composer: string[]
  lyricist: string[]
  vocal: string[]
  arranger: string[]
}

interface StaffIconProps {
  type: StaffType
}

const StaffIcon = ({ type }: StaffIconProps) => {
  switch (type) {
    case "composer":
      return <PianoIcon />

    case "lyricist":
      return <LyricsIcon />

    case "vocal":
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

const StaffList = ({ staff: { composer, lyricist, vocal, arranger } }: { staff: StaffInfo }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={1}
    sx={{
      alignItems: { xs: "flex-start", sm: "center" },
    }}
  >
    {composer.length > 0 && (
      //composer
      <StaffLinks type="composer" names={composer} />
    )}
    {lyricist.length > 0 && (
      <StaffLinks type="lyricist" names={lyricist} />
    )}
    {vocal.length > 0 && (
      <StaffLinks type="vocal" names={vocal} />
    )}
    {arranger.length > 0 && (
      <StaffLinks type="arranger" names={arranger} />
    )}
  </Stack>
)



export { StaffIcon, StaffInfo };
export default StaffList