import React from "react"
import { Link } from "gatsby"
import { Grid, Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
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
    <Grid container spacing={2} justifyContent="center">
      {list.map(item => (
        <Grid  size={{xs:12,sm:6}} key={item.id}>
          <Card component={Link} to={item.slug} sx={{ position: "relative" }}>
            <CardMedia>
              <CoverImage coverimage={item.coverImage} alt={item.title} />
            </CardMedia>
            <Box sx={labelStyle}>{item.title}</Box>
          </Card>
        </Grid>
      ))}
    </Grid>

    
  )
}



export default RecordGroup