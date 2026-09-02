import React from "react"
import { Link as GLink } from "gatsby"
import { Grid, Card, CardMedia, CardActionArea, Typography, Box } from "@mui/material"
import _ from "lodash"
import { useRecordsData } from "../hooks/useRecordsData"
import CoverImage from "./CoverImage"

type Props = {
  discographyId: string[]
}

const labelStyle = {
  position: "absolute" as const,
  bottom: 0,
  width: "100%",
  bgcolor: "rgba(0,0,0,0.3)",
  color: "#fff",
  textAlign: "center" as const,
  py: 0.5,
  fontSize: 12,
}

const RecordGroup = ({ discographyId }: Props) => {
  const records = useRecordsData()
  const list = records.filter(p => discographyId.includes(p.id))

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {list.map(item => (
        <Grid size={12} key={item.id}>
          <Card sx={{ position: "relative", borderRadius: 2, overflow: 'hidden' }}>
            <CardActionArea
              component={GLink}
              to={item.slug}
              sx={{
                aspectRatio: '1 / 1',
              }}>
              <CardMedia>
                <CoverImage coverimage={item.coverImage} alt={item.title} />
              </CardMedia>
              <Box sx={labelStyle}>{item.title}</Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>


  )
}



export default RecordGroup