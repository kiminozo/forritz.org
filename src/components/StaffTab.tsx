import { Box, Tab, Tabs } from "@mui/material";
import { Link as GLink } from "gatsby";
import React from "react";

import { StaffIcon, StaffType, StaffTypeName } from "./StaffList";



interface StaffTabProp {
    staffName: String
    staffType: StaffType
    staffWork: StaffWorks
}

interface ArtistCount {
    totalCount: number;
}

interface StaffWorks {
    vocal: ArtistCount;
    composer: ArtistCount;
    lyricist: ArtistCount;
    arranger: ArtistCount;
}




const StaffTypes: StaffType[] = ["composer", "lyricist", "vocal", "arranger"]

const StaffTabs = (props: StaffTabProp) => {
    const { staffName, staffType, staffWork } = props;

    return (<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={staffType} aria-label="staff tabs"
            sx={{
                padding: 0,
                margin: 0,
                "& .MuiTabs-flexContainer": {
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(4, 1fr)",
                    },
                },
            }}>
            {StaffTypes.map((type) => (
                <Tab
                    key={type}
                    value={type}
                    icon={<StaffIcon type={type} />}
                    iconPosition="start"
                    label={`${StaffTypeName[type]}(${staffWork[type].totalCount})`}
                    component={GLink}
                    to={`/${type}/${staffName}`}
                    disabled={staffWork[type].totalCount === 0}
                />
            ))}
        </Tabs>
    </Box >
    )
}

export { StaffWorks };
export default StaffTabs