import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link } from "gatsby"
import { CoverImage } from ".";
import {
    Card, Divider, Grid, Header, Icon
} from 'semantic-ui-react'

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
        {!single &&
            <Header as='h2' dividing={artists.length > 1}>
                <Link to={`/discography/${_.kebabCase(category)}/`}>{category}</Link>
            </Header>
        }
        {
            artists.map(({ artist, records }) => (
                <React.Fragment key={artist}>
                    {artists.length > 1 && (
                        <Header as={single ? 'h2' : "h3"}>
                            <Header.Content>
                                <Link to={`/discography/${_.kebabCase(artist)}/`}>{artist}</Link>
                            </Header.Content>
                        </Header>
                    )}
                    <Card.Group itemsPerRow={5} doubling>
                        {records.map(item =>
                            (
                                <Card as={Link} key={item.id} to={item.slug}>
                                    <CoverImage key={item.id} coverimage={item.coverImage} />
                                </Card>
                            )
                        )}
                    </Card.Group>
                </React.Fragment>
            ))
        }
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
