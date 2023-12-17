import React, { Component } from "react"
// Components
import { Link, navigate } from "gatsby"
import { SEO, Layout } from "../../components";
import StaffList, { StaffInfo } from '../../components/StaffList'
import { List, Pagination } from "semantic-ui-react";
import { kebabCase } from "lodash";


export interface TemplateProps {
    title: string
    pageContext: {
        staff: string;
        basePath: string;
        activePage: number,
        totalPages: number
    }
    data: {
        songs: {
            totalCount: number
            nodes: {
                song: StaffInfo & {
                    slug: string
                    title: string
                }
            }[]
        }
    }
};

function getPath(basePath: string, activePage: string | number | undefined) {
    const path = (activePage === 1 || activePage === "1")
        ? basePath : basePath + "/" + activePage;
    return path;
}

export const Head = (props: TemplateProps) => <SEO title={props.title} />


export class StaffTemplatePage extends Component<TemplateProps> {
    render() {
        const { title,
            pageContext: { basePath, activePage, totalPages },
            data: { songs: { nodes, totalCount } } } = this.props;

        // const staffHeader = `${totalCount} post${
        //     totalCount === 1 ? "" : "s"
        //     } tagged with "${staff}"`
        return (
            <Layout path="songs">
                <h1>{title}</h1>
                <h1>曲目列表</h1>
                <List divided relaxed>
                    {nodes.map(({ song }) =>
                    (
                        <List.Item key={song.slug}>
                            <List.Icon name="music" size="large" color='blue' />
                            <List.Content>
                                <List.Header as="h3">
                                    <Link to={song.slug}>{song.title}</Link>
                                </List.Header>
                                <List.Description>
                                    <StaffList key={song.slug} staff={song} />
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))
                    }
                </List>
                {totalPages > 1 &&
                    (
                        <div>
                            <Pagination
                                onPageChange={(e, { activePage }) => { navigate(getPath(basePath, activePage)) }}
                                firstItem={null}
                                lastItem={null}
                                prevItem={activePage === 1 ? null : undefined}
                                nextItem={activePage === totalPages ? null : undefined}
                                activePage={activePage}
                                totalPages={totalPages} />
                        </div>
                    )
                }
            </Layout>
        )
    }
}