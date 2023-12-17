import { Link } from "gatsby"
import React from "react"
import { Menu, Container, Divider, Segment, Grid, List, Header } from 'semantic-ui-react'

import "./footer.sass"

//Build with GatsbyJS and React 16.12.0. Hosted on V
//The code is open source and available at 
//Copyright ©forritz Theme by kiminozo

const Footer = () => (
    <>
        <Divider />

        <Segment as="footer" vertical style={{ padding: 10 }}>
            <Container>
                <Grid divided stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header as='h4' content='社区' color='grey' />
                            <List link >
                                <List.Item as='a' href="https://bbs.forritz.org" >加入讨论</List.Item>
                                <List.Item as={Link} to='/about'>特别感谢</List.Item>
                                <List.Item as='a' href='/sitemap-index.xml'>网站地图</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header as='h4' content='技术' color='grey' />
                            <List link >
                                <List.Item as='a' href="https://github.com/kiminozo/forritz.org" target="_Blank">Source Code</List.Item>
                                <List.Item as='a' href="https://react.semantic-ui.com" target="_Blank">Semantic UI React</List.Item>
                                <List.Item as='a' href="https://www.gatsbyjs.org/" target="_Blank">GatsbyJS</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h4' content='关于' color='grey' />
                            <List link >
                                {/* <List.Item>
                                    这里是已故音乐唱作歌手岡崎律子小姐的非官方中文资料站，
                                </List.Item> */}
                                <List.Item>
                                    © 2006-{new Date().getFullYear()},
                                    <Link to="/">For RITZ</Link>
                                    {` `}All rights reserved.
                                </List.Item>
                                <List.Item>
                                    Open Source (MIT)
                                </List.Item>

                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </>
)

export default Footer
