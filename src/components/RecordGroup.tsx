import { Grid, Typography } from "@mui/material"
import React from "react"
import { useRecordsData } from "../hooks/useRecordsData"
import AlbumCard from "./AlbumCard"

type Props = {
  discographyId: string[]
  otherId?: string[]
}


const RecordGroup = ({ discographyId, otherId }: Props) => {
  const records = useRecordsData()
  const list = records.filter(p => discographyId.includes(p.id))
  const otherList = otherId && records.filter(p => otherId.includes(p.id))

  return (
    <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
      {[
        ...list.map(item => (
          <Grid
            key={item.id}
            size={{
              xs: 6,
              sm: 4,
              md: 2,
            }}
          >
            <AlbumCard
              coverImage={item.coverImage}
              slug={item.slug}
              scales="inside"
              hasLabel
              title={item.title}
              artist={item.artist}
            />
          </Grid>
        )),
        ...(otherList ?? []).map(item => (
          <Grid
            key={item.id}
            size={{
              xs: 6,
              sm: 4,
              md: 2,
            }}
          >
            <AlbumCard
              coverImage={item.coverImage}
              slug={item.slug}
              scales="inside"
              hasLabel
              title={item.title}
              artist={item.artist}
            />
          </Grid>
        )),
      ]}
    </Grid>
  )
}



export default RecordGroup