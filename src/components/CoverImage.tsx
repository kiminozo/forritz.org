import React, { CSSProperties } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useCoverImagesData } from "../hooks/useCoverImagesData"
import demo from "../images/demo.png"
import { Box } from "@mui/material"


interface Props {
  coverimage: string
  size?: "small" | "medium" | "large"
  bordered?: boolean
  rounded?: boolean
  alt?: string
  sx?: CSSProperties | undefined;
}

const imgStyle = { maxHeight: 200 }

const useKeyOnly = (val: any, key: string) => val && key;

// 模拟 semantic size
const sizeMap = {
  small: 120,
  medium: 200,
  large: 300,
}

const CoverImage = (props: Props) => {
  const data = useCoverImagesData();
  const { coverimage: coverImage, bordered, rounded, alt } = props
  const imageInfo = data.filter(p => p.base === coverImage)[0];
  const commonSx = {
    border: bordered ? "1px solid rgba(0,0,0,0.2)" : "none",
    borderRadius: rounded ? 2 : 0,
    aspectRatio: '1 / 1',
  }

  if (imageInfo) {
    const image = getImage(imageInfo.image)

    return image ? (
      <Box sx={commonSx}>
        <GatsbyImage
          image={image}
          alt={alt ?? ""}
          style={props.sx ?? { height: "100%", width: "100%" }}
          imgStyle={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    ) : (
      <Box
        component="img"
        src={imageInfo.publicURL}
        alt={alt ?? ""}
        sx={commonSx}
      />
    )
  }
  return (
    <Box
      component="img"
      src={demo}
      alt=""
      sx={commonSx}
    />
  )
}

export default CoverImage
