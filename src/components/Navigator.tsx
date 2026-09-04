import {
    Box,
    Container,
    Menu, MenuItem,
    Tab,
    Tabs
} from "@mui/material"
import { Link as GLink } from "gatsby"
import React from "react"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import _ from "lodash"
import { MenuConfig, menusConfig } from "../menu"

type Props = {
    pathName: string
}

function getPath(pathName: string) {
    const start = pathName.startsWith("/") ? 1 : 0
    const end = pathName.endsWith("/") ? pathName.length - 1 : pathName.length
    return pathName.substring(start, end)
}

function isActive(item: MenuConfig, pathName: string): boolean {
    const path = getPath(pathName)
    const dir = path.split("/")[0]

    const part = (array?: string[]) =>
        array ? _.findIndex(array, x => x === dir) >= 0 : false

    if (item.sub) {
        return (
            _.findIndex(item.sub, p => getPath(p.link) === path) >= 0 ||
            _.findIndex(item.sub, p => part(p.active)) >= 0
        )
    }

    return (
        item.link === pathName ||
        getPath(item.link) === dir ||
        part(item.active)
    )
}

export default function Navigator({ pathName }: Props) {
    const menus = menusConfig

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setAnchorEl(event.currentTarget)
        setOpenIndex(index)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setOpenIndex(null)
    }

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={menus.findIndex(item => isActive(item, pathName))}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="nav tabs">
                    {menus.map((item, index) =>
                        item.sub ? (
                            <div>
                                <Tab key={item.name}
                                    label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {item.name}
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    </Box>}
                                    onClick={(e) => handleOpen(e, index)}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={openIndex === index}
                                    onClose={handleClose}
                                >
                                    {
                                        item.sub.map(sub => (
                                            <MenuItem
                                                key={sub.name}
                                                component={GLink}
                                                to={sub.link}
                                                onClick={handleClose}
                                            >
                                                {sub.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </div>
                        ) : (
                            <Tab
                                value={index}
                                key={item.name}
                                label={item.name}
                                component={GLink}
                                to={item.link}
                            />
                        )
                    )}
                </Tabs>
            </Box>
        </Container >
    )
}