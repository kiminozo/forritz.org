import CopyrightIcon from "@mui/icons-material/Copyright"
import { Alert, AlertTitle, Link, Typography } from "@mui/material"
import React, { JSX } from "react"

const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"

declare interface License {
    type: string
    author: string
    reproduced_url: string
    reproduced_website: string
    translator: string
}


const CC = ({ license }: { license?: License }) => {
    if (!license) {
        return null;
    }
    let content: JSX.Element;
    const { translator, author, reproduced_url, reproduced_website } = license;
    if (translator) {
        content = <> 本文是翻译内容，{reproduced_url && (<>翻译自<Link href={reproduced_url} underline="hover" target="_Blank">{reproduced_website}</Link>, </>)}译者:{translator}。</>
    } else if (author) {
        content = <> 本文是转载内容，转载自<Link href={reproduced_url} underline="hover" target="_Blank">{reproduced_website}</Link>, 原作者:{author}。</>
    } else {
        content = <>本文是原创内容，转载请注明转自 <Link href="https://forritz.org" underline="hover">For RITZ 岡崎律子的非官方中文资料站</Link></>
    }

    return (
        <Alert
            severity="info"
            icon={<CopyrightIcon fontSize="inherit" />}
            sx={{ mt: 2 }}
        >
            <AlertTitle>
                <Link href={byncsa} underline="hover" target="_blank" rel="noopener" >
                    BY-NC-SA 4.0
                </Link>
            </AlertTitle>
            <Typography variant="body2">{content}</Typography>
        </Alert>
    )
};

export { License }
export default CC
