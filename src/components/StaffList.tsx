import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Stack, Typography, Link } from "@mui/material"

interface StaffInfo {
  songWriter: string[]
  lyricWriter: string[]
  singer: string[]
  arranger: string[]
}

const StaffList = ({ staff: { songWriter, lyricWriter, singer, arranger } }: { staff: StaffInfo }) => (
  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
    {songWriter.length > 0 && (
      //Lyrics
      <Typography component="span" variant="body2">
        <b>作曲</b>{" "}
        <StaffLink type="song-writer" names={songWriter} />
      </Typography>
    )}
    {lyricWriter.length > 0 && (
      //Lyrics
      <Typography component="span" variant="body2">
        <b>作词</b>{" "}
        <StaffLink type="lyric-writer" names={lyricWriter} />
      </Typography>
    )}
    {singer.length > 0 && (
      <Typography component="span" variant="body2">
        <b>演唱</b>{" "}
        <StaffLink type="singer" names={singer} />
      </Typography>
    )}
    {arranger.length > 0 && (
      <Typography component="span" variant="body2">
        <b>编曲</b>{" "}
        <StaffLink type="arranger" names={arranger} />
      </Typography>
    )}
  </Stack>
)

const StaffLink = ({ type, names }: { type: string; names: string[] }) => (
  <>
    {names.map((name, i, arr) => {
      const path = `/${type}/${name}`
      return (
        <React.Fragment key={path}>
          <Link
            component={GatsbyLink}
            to={path}
            underline="hover"
            color="primary"
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

export { StaffInfo, StaffLink }
export default StaffList