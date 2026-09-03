import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link as GatsbyLink } from "gatsby"
import { CoverImage } from ".";
import {
  Container,
  Typography,
  Divider,
  Grid,
  Card,
  CardActionArea,
  Box,
  Link,
} from "@mui/material"
import AlbumCard from "../components/AlbumCard"


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
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: artists.length > 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
            pb: 1
          }}
        >
          <Link color="inherit" underline="hover" component={GatsbyLink}
            to={`/discography/${_.kebabCase(category)}/`}>
            {category}
          </Link>
        </Typography>
      </Box>
    )}

    {artists.map(({ artist, records }) => (
      <Box key={artist} sx={{ mb: 4 }}>
        {artists.length > 1 && (
          <Typography variant={single ? "h5" : "h6"} sx={{ mb: 2 }}>
            <Link color="inherit" underline="hover" component={GatsbyLink}
              to={`/discography/${_.kebabCase(artist)}/`}>
              {artist}
            </Link>
          </Typography>
        )}

        <Grid container spacing={2}>
          {records.map(item => (
            <Grid key={item.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
              <AlbumCard coverImage={item.coverImage} slug={item.slug} title={item.title} square />
            </Grid>
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
    <Container sx={{ px: 0, py: 1, mx: 0, my: 0 }} maxWidth="xl">
      {
        categories.length == 1 ?
          <Records single {...categories[0]} />
          : categories.map(prop => (
            <Records key={prop.category} {...prop} />
          ))
      }
    </Container>
  )
}

export { DiscographyInfo };
export default DiscographyLayout;
