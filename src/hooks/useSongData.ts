import { useStaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase";
import { ListSongInfo } from "../components/ListSongItem";


interface SongSource {
    songs: {
        nodes: {
            frontmatter: ListSongInfo
        }[]
    }
}


export const getSongSlug = (name: string) => useSongData()
    .filter(p => p.title === name || p.titlech === name)
    .map(p => p.slug)[0]

export const useSongData = (): ListSongInfo[] => {
    const data = useStaticQuery<SongSource>(graphql`
      {
        songs: allMarkdownRemark(filter: {frontmatter: {type: {eq: "song"}}}) {
            nodes {
            frontmatter {
                id
                title
                titlech
                vocal
                composer
                lyricist
                 arranger
                 slug
            }
        }
    }
    }`)
    return data.songs.nodes.map(p => p.frontmatter);
}
