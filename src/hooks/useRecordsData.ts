import { useStaticQuery, graphql } from "gatsby"

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
