import React, { CSSProperties } from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useCoverImagesData } from "../hooks/useCoverImagesData"

import demo from "../images/demo.png"

import { Box } from "@mui/material"

interface Props {
  coverimage: string
  size?: "small" | "medium" | "large"
  bordered?: boolean
  rounded?: boolean
  square?: boolean
  alt?: string
  sx?: CSSProperties
}

const CoverImage = ({
  coverimage: coverImage,
  bordered,
  rounded,
  square,
  alt,
  sx
}: Props) => {

  const data = useCoverImagesData()

  const imageInfo = data.find(p => p.base === coverImage)

  const commonSx = {
    border: bordered ? "1px solid rgba(0,0,0,0.2)" : "none",
    borderRadius: rounded ? 2 : 0,
    width: "100%",
  }

  if (imageInfo) {
    const image = getImage(
      square ? imageInfo.square : imageInfo.image
    )
    return image ? (
      <Box sx={commonSx}>
        <GatsbyImage
          image={image}
          alt={alt ?? ""}
          style={{
            width: "100%",
            height: "auto",
            ...sx,
          }}
          imgStyle={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
    ) : (
      <Box
        component="img"
        src={imageInfo.publicURL}
        alt={alt ?? ""}
        sx={{
          ...commonSx,
          height: "auto",
        }}
      />
    )
  }

  return (
    <Box
      component="img"
      src={demo}
      alt=""
      sx={{
        ...commonSx,
        height: "auto",
      }}
    />
  )
}

export default CoverImage