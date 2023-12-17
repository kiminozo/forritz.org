import React, { Component } from "react"
import { Message, Icon } from 'semantic-ui-react'
import "./CC.sass"
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
        <Message info >
            <Message.Header>
                <Icon name='cc' size="large" />
                <a href={byncsa} target="_Blank">BY-NC-SA 4.0</a>
            </Message.Header>
            <Message.Content>
                {content}
            </Message.Content>
        </Message >
    )
};

export default CC
