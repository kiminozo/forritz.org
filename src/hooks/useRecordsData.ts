import { useStaticQuery, graphql } from "gatsby"
import { kebabCase } from "lodash"

interface RecordsInfo {
    id: string
    title: string
    coverImage: string
    slug: string
    artist: string
}
interface Data {
    records: {
        edges: {
            node: {
                frontmatter: RecordsInfo
            }
        }[]
    }
}

export const getRecordSlug = (name: string) => useRecordsData()
    .filter(p => p.title === name || p.slug === `/discography/${name}`)
    .map(p => p.slug)[0]

export const useRecordsData = (): RecordsInfo[] => {
    const data = useStaticQuery<Data>(graphql`
      {
        records: allMarkdownRemark(filter: 
          {frontmatter: {type: {eq: "record"}}}) {
          edges {
              node {
               frontmatter {
                id
                title
                coverImage
                slug
                artist
              }
            }
          }
         }
      }
    `)
    return data.records.edges.map(p => p.node.frontmatter);
}
