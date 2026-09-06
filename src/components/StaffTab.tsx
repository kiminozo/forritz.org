import { Box, Tab, Tabs } from "@mui/material";
import { Link as GLink } from "gatsby";
import React from "react";

import { StaffIcon, StaffType } from "./StaffList";



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



const StaffTabs = (props: StaffTabProp) => {
    const { staffName, staffType, staffWork } = props;

    return (<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={staffType} aria-label="staff tabs"
            sx={{
                padding: 0,
                margin: 0,
                '& .MuiTab-root': {
                    minHeight: 8,
                    px: 2
                },
            }}>
            <Tab
                value="composer"
                icon={<StaffIcon type="composer" />}
                iconPosition="start"
                label={`作曲(${staffWork.composer.totalCount})`}
                component={GLink}
                to={`/composer/${staffName}`}
                disabled={staffWork.composer.totalCount == 0}
            />
            <Tab
                value="lyricist"
                icon={<StaffIcon type="lyricist" />}
                iconPosition="start"
                label={`作词(${staffWork.lyricist.totalCount})`}
                component={GLink}
                to={`/lyricist/${staffName}`}
                disabled={staffWork.lyricist.totalCount == 0}
            />
            <Tab
                value="vocal"
                icon={<StaffIcon type="vocal" />}
                iconPosition="start"
                label={`演唱(${staffWork.vocal.totalCount})`}
                component={GLink}
                to={`/vocal/${staffName}`}
                disabled={staffWork.vocal.totalCount == 0}

            />
            <Tab
                value="arranger"
                icon={<StaffIcon type="arranger" />}
                iconPosition="start"
                label={`编曲(${staffWork.arranger.totalCount})`}
                component={GLink}
                to={`/arranger/${staffName}`}
                disabled={staffWork.arranger.totalCount == 0}

            />
        </Tabs>
    </Box >
    )
}

export { StaffWorks };
export default StaffTabs