import React from "react";


import {
    Box
} from "@mui/material";

import type { FuseResultMatch } from "fuse.js";

interface IResultMatch {
    matches?: ReadonlyArray<FuseResultMatch>

}

const findIndices = (key: string, matches?: ReadonlyArray<FuseResultMatch>) => {
    return matches?.find(
        match => match.key === key
    )?.indices
}

const HighlightText = ({
    text,
    indices = [],
}: {
    text: string
    indices?: FuseResultMatch["indices"]
}) => {
    if (!indices || !indices.length) {
        return <>{text}</>
    }

    const result: React.ReactNode[] = []
    let lastIndex = 0

    indices.forEach(([start, end], index) => {
        if (start > lastIndex) {
            result.push(text.slice(lastIndex, start))
        }

        result.push(
            <Box
                component="span"
                key={index}
                sx={{
                    backgroundColor: "warning.light",
                    color: "text.primary",
                    borderRadius: 0.5,
                    px: 0,
                }}
            >
                {text.slice(start, end + 1)}
            </Box>
        )

        lastIndex = end + 1
    })

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex))
    }

    return <>{result}</>
}

export { IResultMatch, findIndices }
export default HighlightText