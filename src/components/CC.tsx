import React, { Component, JSX } from "react"
import { Alert, AlertTitle, Link, Box, Typography } from "@mui/material"
import CopyrightIcon from "@mui/icons-material/Copyright"
import { License } from "./License";
import _ from "lodash";

const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"


const CC = ({ license }: { license?: License }) => {
    if (!license) {
        return null;
    }
    let content: JSX.Element;
    const { translator, author, reproduced_url, reproduced_website } = license;
    if (translator) {
        content = <> 本文是翻译内容，{reproduced_url && (<>翻译自<a href={reproduced_url} target="_Blank">{reproduced_website}</a>, </>)}译者:{translator}。</>
    } else if (author) {
        content = <> 本文是转载内容，转载自<a href={reproduced_url} target="_Blank">{reproduced_website}</a>, 原作者:{author}。</>
    } else {
        content = <>本文是原创内容，转载请注明转自 <a href="https://forritz.org">For RITZ 岡崎律子的非官方中文资料站</a></>
    }

    return (
        <Alert
            severity="info"
            icon={<CopyrightIcon fontSize="inherit" />}
            sx={{ mt: 2 }}
        >
            <AlertTitle>
                <Link href={byncsa} target="_blank" rel="noopener">
                    BY-NC-SA 4.0
                </Link>
            </AlertTitle>
            <Typography variant="body2">{content}</Typography>
        </Alert>
    )
};

export default CC
