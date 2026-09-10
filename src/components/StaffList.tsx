import { Chip, Link, Stack } from "@mui/material";
import { Link as GLink } from "gatsby";
import React from "react";

import LyricsIcon from '@mui/icons-material/Lyrics';
import MicIcon from '@mui/icons-material/Mic';
import PianoIcon from '@mui/icons-material/Piano';
import TuneIcon from '@mui/icons-material/Tune';
import { FuseResultMatch } from "fuse.js";
import HighlightText, { IResultMatch, findIndices } from "./HighlightText";

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

interface StaffLinksProps extends IResultMatch {
  type: StaffType
  names: string[]
}


const StaffLinks = ({ type, names, matches }: StaffLinksProps) => (
  <Chip
    variant="outlined" size="small"
    label={<StaffLink type={type} names={names} matches={matches} />}
    avatar={<StaffIcon type={type} />}
  />
)

interface StaffLinkProps extends IResultMatch {
  type: string
  names: string[]
}

const StaffLink = ({ type, names, matches }: StaffLinkProps) => {
  const indices = findIndices(type, matches)
  return (
    <>
      {

        names.map((name, i, arr) => {
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
                <HighlightText text={name} indices={indices} />
              </Link>
              {i !== arr.length - 1 ? " " : null}
            </React.Fragment>
          )
        })}
    </>
  )
}

interface StaffListProps extends IResultMatch {
  staff: StaffInfo,
  flow?: Boolean,
}

const StaffList = ({ staff: { composer, lyricist, vocal, arranger }, flow, matches }: StaffListProps) => (
  <Stack
    direction={{ xs: flow ? "row" : "column", sm: "row" }}
    spacing={1}
    useFlexGap={flow ? true : false}
    sx={{
      alignItems: { xs: "flex-start", sm: "center" },
      flexWrap: 'wrap'
    }}
  >
    {composer.length > 0 && (
      //composer
      <StaffLinks type="composer" names={composer} matches={matches} />
    )}
    {lyricist.length > 0 && (
      <StaffLinks type="lyricist" names={lyricist} matches={matches} />
    )}
    {vocal.length > 0 && (
      <StaffLinks type="vocal" names={vocal} matches={matches} />
    )}
    {arranger.length > 0 && (
      <StaffLinks type="arranger" names={arranger} matches={matches} />
    )}
  </Stack>
)



export { StaffIcon, StaffInfo };
export default StaffList