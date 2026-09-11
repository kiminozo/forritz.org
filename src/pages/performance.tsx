import React from "react"
import {
    Box,
    Button,
    Divider,
    Stack,
    Grid,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as GatsbyLink, PageProps, graphql } from 'gatsby';
import { Layout, SEO, SideBar } from "../components"

/* =========================================================
 * Types
 * ======================================================= */

export interface SongInfo {
    frontmatter: {
        title?: string | null;
        titlech?: string | null;
        type?: string | null;
        date?: string | null;
        order?: number | null;

        vocal?: string[] | null;
        composer?: string[] | null;
        lyricist?: string[] | null;
        arranger?: string[] | null;

        discography?: string[] | null;
        discographyId?: string[] | null;

        slug?: string | null;
        remarks?: string | null;
    };

    fields?: {
        songYear?: string | null;
        songReleaseDate?: string | null;
    };
}

export interface PerformanceTimelineProps {
    songs: SongInfo[];

    /**
     * 每年默认显示多少首
     */
    initialVisible?: number;

    /**
     * 是否默认展开全部
     */
    defaultExpanded?: boolean;
}

/* =========================================================
 * Helpers
 * ======================================================= */



const isRitz = (names: String[] | null | undefined): boolean => {
    if (!names || names == null || names.length == 0) return false
    return names.includes('岡崎律子') === true ||
        names.includes('森野律') === true ||
        names.includes('メロキュア') === true ||
        names.includes('Ritz') === true;
}
/**
 * 生成歌曲参与角色
 *
 * 例如：
 *
 * 作词 / 作曲 / 演唱
 */
const getRoles = ({ frontmatter }: SongInfo): string[] => {
    const roles: string[] = [];


    if (isRitz(frontmatter.lyricist)) {
        roles.push('作词');
    }

    if (isRitz(frontmatter.composer)) {
        roles.push('作曲');
    }

    if (isRitz(frontmatter.vocal)) {
        roles.push('演唱');
    }

    if (isRitz(frontmatter.arranger)) {
        roles.push('编曲');
    }

    return roles;
};

/**
 * 获取主要参与者
 *
 * 优先显示 vocal。
 *
 * 例如：
 * 岡崎律子 · 作词 / 作曲 / 演唱
 */
/**
 * 格式化参与信息
 */
const getStaffText = (song: SongInfo): string => {
    const roles = getRoles(song);

    return ` ${roles.join(' / ')}`;
};

// /**
//  * 获取收录作品
//  */
// const getDiscography = (song: SongInfo): string[] => {
//     return unique(song.frontmatter.discography);
// };

/**
 * 判断是否属于重要歌曲
 *
 * 这里先采用一个简单规则：
 *
 * 岡崎律子本人演唱的歌曲优先突出。
 *
 * 后续如果你想手动控制，可以在 frontmatter
 * 增加 important: true。
 */
const isImportant = (song: SongInfo): boolean => {
    return (
        song.frontmatter.vocal?.includes('岡崎律子') === true
    );
}



/**
 * 将 remarks 按换行拆开
 */
const getRemarks = (remarks?: string | null): string[] => {
    if (!remarks) {
        return [];
    }

    return remarks
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
};

/**
 * 按年份分组
 */
const groupByYear = (songs: SongInfo[]) => {
    const groups = new Map<string, SongInfo[]>();

    songs.forEach((song) => {
        const year = song.fields?.songYear ?? '年代未知';

        if (!groups.has(year)) {
            groups.set(year, []);
        }

        groups.get(year)!.push(song);
    });

    return Array.from(groups.entries())
        .sort(([yearA], [yearB]) => {
            if (yearA === '年代未知') return 1;
            if (yearB === '年代未知') return -1;

            return Number(yearA) - Number(yearB);
        })
        .map(([year, songs]) => ({
            year,
            songs: songs.sort((a, b) =>
                (a.fields?.songReleaseDate ?? '').localeCompare(
                    b.fields?.songReleaseDate ?? '',
                ),
            ),
        }));
};

/* =========================================================
 * SongItem
 * ======================================================= */

interface SongItemProps {
    song: SongInfo;
}

const SongItem = ({ song }: SongItemProps) => {
    const important = isImportant(song);

    const remarks = getRemarks(song.frontmatter.remarks);
    const discographys = song.frontmatter.discography

    const staffText = getStaffText(song);

    return (
        <Box
            sx={{
                position: 'relative',

                pl: {
                    xs: 2.5,
                    sm: 3,
                },

                pb: 2,

                '&:last-child': {
                    pb: 1,
                },

                /**
                 * 时间线节点
                 */
                '&::before': {
                    content: '""',

                    position: 'absolute',

                    left: 0,

                    top: important ? 7 : 8,

                    width: important ? 9 : 7,
                    height: important ? 9 : 7,

                    borderRadius: '50%',

                    bgcolor: important
                        ? 'primary.main'
                        : 'divider',

                    transform: 'translateX(-50%)',

                    zIndex: 1,
                },
            }}
        >
            {/* =================================================
       * Song title
       * =============================================== */}

            {song.frontmatter.slug ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                    }}
                >
                    <Typography
                        className="song-title"
                        component={GatsbyLink}
                        to={song.frontmatter.slug}
                        variant="h6"
                        sx={{
                            color: 'text.primary',
                            transition: 'color 0.2s',
                            lineHeight: 1.5,
                            textDecoration: 'none',

                            '&:hover .song-title': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {song.frontmatter.title}
                    </Typography>
                    <Typography
                        color="secondary"
                        variant="body2"
                        component="div"
                    >
                        {song.frontmatter.vocal?.join(" · ")}
                    </Typography>
                </Box>
            ) : (
                <Typography
                    variant="h6"
                    sx={{
                        lineHeight: 1.5,
                        fontWeight: 600
                    }}
                >
                    {song.frontmatter.title}
                </Typography>
            )}

            {/* =================================================
       * Staff
       * =============================================== */}

            {staffText && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.25,
                        lineHeight: 1.5,
                    }}
                >
                    {staffText}
                </Typography>
            )}

            {/* =================================================
       * Discography
       * =============================================== */}
            {/* {discographys && discographys.length > 0 && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        mt: 0.25,
                        opacity: 0.75,
                        lineHeight: 1.5,
                    }}
                >
                    {discographys.join(' · ')}
                </Typography>

            )
            } */}

            {/* =================================================
       * Remarks
       * =============================================== */}

            {/* {remarks.length > 0 && (
                <Box
                    sx={{
                        mt: 0.5,
                    }}
                >
                    {remarks.map((remark, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.8rem',
                                lineHeight: 1.6,
                                opacity: 0.8,
                            }}
                        >
                            {remark}
                        </Typography>
                    ))}
                </Box>
            )} */}
        </Box >
    );
};

/* =========================================================
 * YearSection
 * ======================================================= */

interface YearSectionProps {
    year: string;
    songs: SongInfo[];

    initialVisible: number;
    defaultExpanded: boolean;
}

const YearSection = ({
    year,
    songs,
    initialVisible,
    defaultExpanded,
}: YearSectionProps) => {
    const [expanded, setExpanded] =
        React.useState(defaultExpanded);

    const hasMore =
        songs.length > initialVisible;

    const visibleSongs = expanded
        ? songs
        : songs.slice(0, initialVisible);

    const hiddenCount =
        songs.length - initialVisible;

    return (
        <Box
            id={`y${year}`}
            sx={{
                display: 'grid',

                gridTemplateColumns: {
                    xs: '56px minmax(0, 1fr)',
                    sm: '80px minmax(0, 1fr)',
                    md: '100px minmax(0, 1fr)',
                },

                columnGap: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                scrollMarginTop: {
                    xs: 100,
                    md: 120,
                },
            }}
        >
            {/* =================================================
       * Year
       * =============================================== */}

            <Box
                sx={{
                    pt: 0.25,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: {
                            xs: '1.1rem',
                            sm: '1.4rem',
                            md: '1.4rem',
                        },
                        fontWeight: 600
                    }}
                >
                    {year}
                </Typography>
            </Box>

            {/* =================================================
       * Timeline
       * =============================================== */}

            <Box
                sx={{
                    position: 'relative',

                    /**
                     * 时间线
                     */
                    '&::before': {
                        content: '""',

                        position: 'absolute',

                        left: 0,

                        top: 8,

                        bottom: 0,

                        width: '1px',

                        bgcolor: 'divider',
                    },
                }}
            >
                {/* =================================================
         * Songs
         * =============================================== */}

                {visibleSongs.map((song, index) => (
                    <SongItem
                        key={`${year}-${song.frontmatter.slug ?? song.frontmatter.title}-${index}`}
                        song={song}
                    />
                ))}

                {/* =================================================
         * Expand button
         * =============================================== */}

                {hasMore && (
                    <Box
                        sx={{
                            position: 'relative',

                            pl: {
                                xs: 2.5,
                                sm: 3,
                            },

                            pt: 0.25,
                        }}
                    >
                        <Button
                            size="small"
                            color="inherit"
                            onClick={() =>
                                setExpanded((value) => !value)
                            }
                            endIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        transform: expanded
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',

                                        transition:
                                            'transform 0.2s',
                                    }}
                                />
                            }
                            sx={{
                                minWidth: 0,

                                px: 0,

                                color: 'text.secondary',

                                '&:hover': {
                                    bgcolor: 'transparent',
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {expanded
                                ? '收起'
                                : `还有 ${hiddenCount} 首`}
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

/* =========================================================
 * YearNavigation
 * ======================================================= */

interface YearNavigationProps {
    years: string[];
}

const YearNavigation = ({
    years,
}: YearNavigationProps) => {
    return (
        <Box
            sx={{
                position: 'sticky',

                top: {
                    xs: 0,
                    md: 0,
                },

                zIndex: 10,

                py: 1,

                bgcolor: 'background.paper',

                borderTop: 1,
                borderBottom: 1,
                borderColor: 'divider',

                mb: {
                    xs: 4,
                    md: 6,
                },

                overflowX: 'auto',

                scrollbarWidth: 'none',

                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            <Stack
                direction="row"
                spacing={0.5}
                sx={{
                    minWidth: 'max-content',
                }}
            >
                {years.map((year) => (
                    <Button
                        key={year}
                        href={`#y${year}`}
                        size="small"
                        color="inherit"
                        sx={{
                            minWidth: {
                                xs: 48,
                                sm: 56,
                            },

                            px: 1,

                            fontSize: {
                                xs: '0.75rem',
                                sm: '0.8rem',
                            },

                            color: 'text.secondary',

                            '&:hover': {
                                color: 'primary.main',
                                bgcolor: 'action.hover',
                            },
                        }}
                    >
                        {year}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};

/* =========================================================
 * PerformanceTimeline
 * ======================================================= */

const PerformanceTimeline = ({
    songs,
    initialVisible = 8,
    defaultExpanded = false,
}: PerformanceTimelineProps) => {
    const years = React.useMemo(
        () => groupByYear(songs),
        [songs],
    );

    return (
        <Box>
            <Typography variant="h4" sx={{ pb: 1 }}>
                音乐年表
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 1 }}
            >
                岡崎律子的参加创作的音乐年历。
            </Typography>
            <Divider sx={{ my: 1, px: 3, pb: 1 }} />
            {/* <YearNavigation
                years={years.map((item) => item.year)}
            /> */}

            <Stack
                spacing={{
                    xs: 4,
                    md: 5,
                }}
            >
                {years.map((item, index) => (
                    <React.Fragment key={item.year}>
                        <YearSection
                            year={item.year}
                            songs={item.songs}
                            initialVisible={initialVisible}
                            defaultExpanded={defaultExpanded}
                        />

                        {index < years.length - 1 && (
                            <Divider
                                sx={{
                                    ml: {
                                        xs: 7,
                                        sm: 10,
                                        md: 12,
                                    },
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Stack>
        </Box>
    );
};




interface Data {
    allMarkdownRemark: {
        nodes: SongInfo[]
    };
}



export const query = graphql`
  query PerformancePage {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          type: { eq: "song" }
        }
      }
      sort: {
        frontmatter: {
          order: ASC
        }
      }
    ) {
      nodes {
        frontmatter {
          title
          titlech
          type
          date
          order

          vocal
          composer
          lyricist
          arranger

          discography
          discographyId

          slug
          remarks
        }
        fields {
           songYear
           songReleaseDate
        }
      }
    }
  }
`;



const PerformancePage = (props: PageProps<Data>) => {
    const songs = props.data.allMarkdownRemark.nodes
    return (
        <Layout path={props.location.pathname}>
            <Grid container spacing={2}>
                {/* 主内容 */}
                <Grid size={{ xs: 12, md: 10 }} >
                    <PerformanceTimeline
                        songs={songs}
                        initialVisible={30}
                    />
                </Grid>
                {/* 侧边栏 */}
                <Grid size={{ xs: 12, md: 2 }} >
                    <SideBar />
                </Grid>
            </Grid>
        </Layout>

    );
};

export default PerformancePage;

