import React from "react"
import { Link as GLink, PageProps, graphql } from "gatsby"
import { SEO, Layout, CoverImage } from "../components"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import {
    Grid,
    Divider,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Box,
    CardActionArea,
} from "@mui/material"

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
    square?: boolean
    hasLabel?: boolean
}

const AlbumCard = ({ slug, coverImage, square, title, hasLabel }: AlbumCardProp) => (
    <Card
        sx={{
            borderRadius: 2,
            overflow: "hidden",
        }}
    >
        <CardActionArea
            component={GLink}
            to={slug ?? "#"}
        >
            <CardMedia>
                <CoverImage
                    coverimage={coverImage}
                    square={square}
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