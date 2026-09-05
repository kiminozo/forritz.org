import {
    Box,
    Card,
    CardActionArea,
    CardMedia
} from "@mui/material"
import { Link as GLink } from "gatsby"
import React from "react"
import { CoverImage } from "../components"
import { ScalesType } from "./CoverImage"

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

interface AlbumCardProp {
    coverImage: string
    title?: string
    slug?: string
    scales?: ScalesType
    hasLabel?: boolean
}

const AlbumCard = ({ slug, coverImage, scales, title, hasLabel }: AlbumCardProp) => (
    <Card
        sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
        }}
    >
        <CardActionArea
            component={GLink}
            to={slug ?? "#"}
        >
            <CardMedia>
                <CoverImage
                    coverimage={coverImage}
                    scales={scales}
                    alt={title}
                    sx={{
                        width: "100%",
                        display: "block",
                    }}
                />
            </CardMedia>
            {hasLabel && <Box sx={labelStyle}>{title}</Box>}
        </CardActionArea>
    </Card>
)

export default AlbumCard