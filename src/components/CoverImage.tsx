import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useCoverImagesData } from '../hooks/useCoverImagesData'
import demo from "../images/demo.png"
import { Image, ImageProps, SemanticSIZES } from 'semantic-ui-react'
import cx from 'classnames'

interface Props {
  coverimage: string
  size?: SemanticSIZES
  bordered?: boolean
  rounded?: boolean
  alt?: string
}

const imgStyle = { maxHeight: 200 }

const useKeyOnly = (val: any, key: string) => val && key;

const CoverImage = (props: Props) => {
  const data = useCoverImagesData();
  const { coverimage: coverImage, size, bordered, rounded, alt } = props;
  const imageInfo = data.filter(p => p.base === coverImage)[0];
  const className = cx(
    'ui',
    size ? size : 'medium',
    'image',
    useKeyOnly(bordered, 'bordered'),
    useKeyOnly(rounded, 'rounded'),
  )
  if (imageInfo) {
    const image = getImage(imageInfo.image)
    return image ?
      <GatsbyImage
        image={image}
        className={className}
        alt={alt ?? ""} />
      : <Image size={size} src={imageInfo.publicURL} />;
  }
  return <Image size={size} style={imgStyle} src={demo} ></Image>
}

export default CoverImage
