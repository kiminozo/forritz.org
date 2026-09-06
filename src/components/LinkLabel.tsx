import React, { JSX } from "react"
import { Chip, Link, Typography } from "@mui/material"

//    type: "song" | "artist" | "record"

interface LinkLabelProp {
    children: String
}

interface SongProps {
    children: string;
}

const Artist = ({ children }: LinkLabelProp) => {
    return <Link color="secondary" underline="hover">{children}</Link>
}

const Record = ({ children }: LinkLabelProp) => {
    return <Chip label={children} size="small" />
}

const Song = ({ children }: LinkLabelProp) => {
    return <Chip label={children} size="small" />
}

export { Artist, Record, Song }