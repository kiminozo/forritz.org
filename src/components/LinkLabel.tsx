import React, { JSX } from "react"
import { Chip, Link, Typography } from "@mui/material"
import { Link as GLink } from 'gatsby';
import { getSongSlug } from "../hooks/useSongData";
import { getRecordSlug } from "../hooks/useRecordsData";

interface LinkLabelProp {
    name?: string
    children: string
}

interface SongProps {
    children: string;
}

const Artist = ({ name, children }: LinkLabelProp) => {
    return <Link component={GLink} to={`/discography/${name ?? children}`} color="secondary" underline="hover">{children}</Link>
}

const Record = ({ name, children }: LinkLabelProp) => {
    const slug = getRecordSlug(name ?? children)
    return <Link component={GLink} to={slug} color="secondary" underline="hover">《{children}》</Link>
}

const Song = ({ name, children }: LinkLabelProp) => {
    const slug = getSongSlug(name ?? children)
    return <Link component={GLink} to={slug} color="secondary" underline="hover">《{children}》</Link>
}

export { Artist, Record, Song }