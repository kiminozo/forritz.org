import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link as GatsbyLink } from "gatsby"
import { CoverImage } from ".";
import {
  Typography,
  Divider,
  Grid,
  Card,
  CardActionArea,
  Box
} from "@mui/material"


interface DiscographyInfo {
    coverImage: string;
    id: string;
    title: string;
    slug: string;
    artist: string
    categories: string[]
}

interface DiscographyProps {
    records: DiscographyInfo[];
}

//const cardSize = { width: 150, height: 150 };
interface RecordsProp {
    single?: boolean;
    category: string;
    artists: {
        artist: string;
        records: DiscographyInfo[];
    }[]
}


const Records = ({ single, category, artists }: RecordsProp) => (
  <>
    {!single && (
      <Box mb={2}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: artists.length > 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
            pb: 1
          }}
        >
          <GatsbyLink to={`/discography/${_.kebabCase(category)}/`}>
            {category}
          </GatsbyLink>
        </Typography>
      </Box>
    )}

    {artists.map(({ artist, records }) => (
      <Box key={artist} mb={4}>
        {artists.length > 1 && (
          <Typography variant={single ? "h5" : "h6"} mb={2}>
            <GatsbyLink to={`/discography/${_.kebabCase(artist)}/`}>
              {artist}
            </GatsbyLink>
          </Typography>
        )}

        <Grid container spacing={2}>
          {records.map(item => (
              <Card>
                <CardActionArea component={GatsbyLink} to={item.slug}>
                  <CoverImage
                    alt={item.title}
                    coverimage={item.coverImage}
                  />
                </CardActionArea>
              </Card>
          ))}
        </Grid>

        <Divider sx={{ mt: 3, visibility: "hidden" }} />
      </Box>
    ))}
  </>
)


const DiscographyLayout = ({ records }: DiscographyProps) => {
    // const { records: { nodes } } = props;
    // const records = nodes.map(p => p.frontmatter);

    const group = _.groupBy(records, p => p.categories[0]);
    const groupArtist = (records: DiscographyInfo[]) => {
        const g = _.groupBy(records, p => p.artist);
        return _.map(g, (value, key) => ({ artist: key, records: value }))
    }
    const categories = _.map(group, (value, key) => ({ category: key, artists: groupArtist(value) }));
    return (
        <>
            {
                categories.length == 1 ?
                    <Records single {...categories[0]} />
                    : categories.map(prop => (
                        <Records key={prop.category} {...prop} />
                    ))
            }
        </>
    )
}

export { DiscographyInfo };
export default DiscographyLayout;
