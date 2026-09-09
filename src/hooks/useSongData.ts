import { useStaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase";

interface SongData {
    title: string
    titlech?: string
    slug: string
}

interface SongSource {
    songs: {
        nodes: {
            frontmatter: SongData
        }[]
    }
}


export const getSongSlug = (name: string) => useMetaData()
    .filter(p => p.title === name || p.titlech === name)
    .map(p => p.slug)[0]

export const useMetaData = (): SongData[] => {
    const data = useStaticQuery<SongSource>(graphql`
      {
        songs: allMarkdownRemark(filter: {frontmatter: {type: {eq: "song"}}}) {
            nodes {
            frontmatter {
                id
                title
                titlech
                slug
            }
        }
    }
    }`)
    return data.songs.nodes.map(p => p.frontmatter);
}
