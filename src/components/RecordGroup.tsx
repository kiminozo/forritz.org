import { Grid } from "@mui/material"
import React from "react"
import { useRecordsData } from "../hooks/useRecordsData"
import AlbumCard from "./AlbumCard"

type Props = {
  discographyId: string[]
}


const RecordGroup = ({ discographyId }: Props) => {
  const records = useRecordsData()
  const list = records.filter(p => discographyId.includes(p.id))

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {list.map(item => (
        <Grid size={12} key={item.id}>
          <AlbumCard coverImage={item.coverImage} slug={item.slug} title={item.title} square hasLabel />
        </Grid>
      ))}
    </Grid>


  )
}



export default RecordGroup