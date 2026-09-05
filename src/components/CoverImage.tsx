import React, { CSSProperties } from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useCoverImagesData } from "../hooks/useCoverImagesData"

import demo from "../images/demo.png"

import { Box } from "@mui/material"

type ScalesType = "origin" | "crop" | "inside"

interface Props {
  coverimage: string
  scales?: ScalesType
  alt?: string
  sx?: CSSProperties
}

const commonSx = {
  aspectRatio: "1 / 1",
  width: "100%",
  backgroundColor: "#eee",
  overflow: "hidden",
}

const CoverImage = ({
  coverimage: coverImage,
  scales,
  alt,
  sx
}: Props) => {

  const data = useCoverImagesData()

  const imageInfo = data.find(p => p.base === coverImage)

  // const commonSx = {
  //   border: bordered ? "1px solid rgba(0,0,0,0.2)" : "none",
  //   borderRadius: rounded ? 2 : 0,
  //   width: "100%",
  // }

  if (imageInfo) {
    const image = getImage(
      scales == "crop" ? imageInfo.square : imageInfo.image
    )
    if (!image) {
      return <Box
        component="img"
        src={imageInfo.publicURL}
        alt={alt ?? ""}
        sx={{
          ...commonSx,
          height: "auto",
        }}
      />
    }
    switch (scales) {
      case "inside":
        return <Box sx={commonSx}>
          <GatsbyImage
            image={image}
            alt={alt ?? ""}
            style={{
              width: "100%",
              height: "100%",
              ...sx,
            }}
            imgStyle={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

      default:
        return <Box sx={commonSx}>
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
    }
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

export { ScalesType }
export default CoverImage