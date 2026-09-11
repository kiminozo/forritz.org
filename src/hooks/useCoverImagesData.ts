import { useStaticQuery, graphql } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"

interface CoverImageInfo {
  relativePath: string
  name: string
  publicURL: string
  extension: string
  base: string
  image: ImageDataLike
  square: ImageDataLike
  small: ImageDataLike
}

interface Data {
  coverImages: {
    nodes: CoverImageInfo[]
  }
}


export const query = graphql`
  {
    coverImages: allFile(
      filter: {
        relativeDirectory: { regex: "/record.+/" }
        extension: { in: ["png", "jpg", "webm"] }
      }
    ) {
      nodes {
        name
        publicURL
        extension
        base

        image: childImageSharp {
          gatsbyImageData(
            width: 300
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }

        square: childImageSharp { 
          gatsbyImageData(
            width: 300
            height: 300
            transformOptions: { cropFocus: CENTER }
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }

        small: childImageSharp { 
          gatsbyImageData(
            width: 100
            height: 100
            transformOptions: { cropFocus: CENTER }
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

export const useCoverImagesData = (): CoverImageInfo[] => {
  const data = useStaticQuery<Data>(query)
  return data.coverImages.nodes;
}
