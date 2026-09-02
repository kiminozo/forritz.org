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
    CardActionArea,
} from "@mui/material"

interface AlbumCardProp {
    coverImage: string
    title?: string
    slug?: string
}

const AlbumCard = (prop: AlbumCardProp) => (
    <Card sx={{
        borderRadius: 2,
        overflow: 'hidden',
    }}>
        <CardActionArea
            component={GLink}
            to={prop.slug ?? "#"}
            sx={{
                aspectRatio: '1 / 1',
            }}>
            <CoverImage
                coverimage={prop.coverImage}
                alt={prop.title}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </CardActionArea>
    </Card >
)

export default AlbumCard