import * as React from 'react';
import {
    Box,
    Chip,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Divider,
    Typography,
    Grid
} from '@mui/material';
import { Layout, SEO, SideBar } from "../components"
import { Artist, Record, Song } from "../components/LinkLabel";
import AlbumCard from '../components/AlbumCard';
import { PageProps } from 'gatsby';

interface BiographyEvent {
    year: string;
    title: string;
    content: React.ReactNode;
    important?: boolean;
}
const biography: BiographyEvent[] = [
    {
        year: '1959',
        title: '出生',
        content: (
            <Typography variant="body1">
                12月29日，岡崎律子出生于日本长崎县端岛（军舰岛）。
                她天生左撇子，幼年时期曾因母亲介意而被要求使用右手，
                后来又恢复使用自己习惯的左手。
            </Typography>
        ),
    },
    {
        year: '小学～中学',
        title: '东京生活',
        content: (
            <Typography variant="body1">
                小学三年级时随家人从长崎搬至东京。
                在学校生活中逐渐培养了对音乐的兴趣，并开始接触钢琴等音乐活动。
            </Typography>
        ),
    },
    {
        year: '高中',
        title: '开始音乐创作',
        content: (
            <>
                <Typography variant="body1">
                    高中时期开始尝试作词作曲，并与加藤惠子、堤真耶组成女子三人组合
                    <Artist>エレナー</Artist>。
                </Typography>

                <Box sx={{ mt: 1 }}>
                    第一首歌：<Song>雨がくれたもの</Song>
                </Box>
            </>
        ),
    },
    {
        year: '短期大学',
        title: '音乐与面包店',
        content: (
            <Typography variant="body1">
                在文化祭等活动中发表自己的作品，同时参加羽毛球部。
                进入短期大学后，主要将时间投入面包店兼职以及
                <Artist>エレナー</Artist>的音乐活动，
                在组合中负责钢琴和合唱。
            </Typography>
        ),
    },
    {
        year: '约1982',
        title: '开始职业音乐生涯',
        content: (
            <Typography variant="body1">
                短期大学毕业后曾在普通企业工作。
                约1982年开始正式从事音乐创作，最初主要为广告创作音乐，
                并曾使用<Artist>森野律</Artist>及<Artist>Ritz</Artist>等名义发表作品。
            </Typography>
        ),
    },
    {
        year: '1985',
        title: '作品首次被收录',
        content: (
            <Typography variant="body1">
                创作的歌曲首次被其他音乐人的唱片收录，
                包括鲇川麻弥专辑<Record>Candy Game</Record>
                中的<Song>シークレット・ラブ</Song>。
            </Typography>
        ),
    },
    {
        year: '1991',
        title: '进入动画音乐领域',
        content: (
            <Typography variant="body1">
                开始参与动画音乐，为OVA《1月にはChristmas》演唱主题歌曲，
                此后逐渐将创作领域扩展至动画及声优歌曲。
            </Typography>
        ),
    },
    {
        year: '1992',
        title: '动画音乐创作',
        content: (
            <>
                <Typography variant="body1">
                    参与《魔法のプリンセス ミンキーモモ》的音乐创作，
                    并在最终回演唱自己创作的<Song>約束</Song>。
                </Typography>
            </>
        ),
    },
    {
        year: '1993',
        title: '个人歌手出道',
        content: (
            <Typography variant="body1">
                3月3日，以创作歌手身份正式出道，发行首支单曲
                <Song>悲しい自由</Song>。
                3月24日发行首张个人专辑<Record>Sincerely yours</Record>。
            </Typography>
        ),
    },
    {
        year: '1994～1997',
        title: '个人音乐活动',
        content: (
            <Typography variant="body1">
                相继发行<Record>Joyful Calendar</Record>、
                <Record>A Happy Life</Record>、
                <Record>Ritzberry Fields</Record>、
                <Record>Rain or Shine</Record>等个人作品，
                逐渐形成兼具作词、作曲与演唱能力的个人音乐风格。
            </Typography>
        ),
    },
    {
        year: '1990年代',
        title: '为动画与声优创作歌曲',
        content: (
            <Typography variant="body1">
                在个人歌手活动之外，岡崎律子逐渐活跃于动画音乐领域，
                为<Artist>林原めぐみ</Artist>、<Artist>飯塚雅弓</Artist>、<Artist>井上喜久子</Artist>、<Artist>堀江由衣</Artist>、<Artist>小森まなみ</Artist>等众多歌手及声优合作等声优创作歌曲。
                同时参与《アキハバラ電脳組》《愛天使伝説ウェディングピーチ》
                等动画作品的歌曲制作。
            </Typography>
        ),
    },
    {
        year: '1995',
        title: '动画歌曲创作',
        content: (
            <Typography variant="body1">
                参与《愛天使伝説ウェディングピーチ》的音乐创作，
                为主题曲<Song>夢見る愛天使</Song>作曲，
                同时演唱多首相关歌曲。
            </Typography>
        ),
    },
    {
        year: '1998',
        title: '动画音乐创作持续扩大',
        content: (
            <Typography variant="body1">
                参与《アキハバラ電脳組》《彼氏彼女の事情》等作品的音乐创作，
                并演唱<Song>シンシア・愛する人</Song>。
            </Typography>
        ),
    },
    {
        year: '2000',
        title: 'Love Hina',
        content: (
            <Typography variant="body1">
                全面参与动画《Love Hina》的音乐创作，
                负责主题曲及大量相关歌曲的作词、作曲。
                此后发行<Record>ラブひな OKAZAKI COLLECTION</Record>等作品，
                进一步确立了她在动画音乐领域的地位。
            </Typography>
        ),
    },
    {
        year: '2001',
        title: '水果篮子',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    为动画《水果篮子》创作并演唱主题曲
                    <Song>For フルーツバスケット</Song>，
                    同时创作片尾曲<Song>小さな祈り</Song>。
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    这首歌成为她最具代表性的作品之一，
                    也使她在动画爱好者中获得更广泛的知名度。
                </Typography>
            </>
        ),
    },
    {
        year: '2002',
        title: 'Melocure 结成',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    与歌手日向めぐ组成双人音乐组合
                    <Artist>メロキュア（Melocure）</Artist>，
                    开始以组合名义推出动画歌曲。
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                    同年参与《Sister Princess RePure》的音乐创作，
                    并为《プリンセスチュチュ》创作并演唱主题曲，
                    发行相关单曲<Song>Morning Grace</Song>。
                </Typography>
            </>
        ),
    },
    {
        year: '2003',
        title: '创作高峰与新尝试',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    参与工画堂制作的音乐游戏《Symphonic Rain》，
                    负责大量歌曲的创作。
                    其中主题曲<Song>空の向こうに</Song>和
                    片尾曲<Song>涙がほおを流れても</Song>
                    均由她亲自演唱。
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                    同年继续以<Artist>メロキュア（Melocure）</Artist>的名义活动，
                    同时持续为动画、声优及其他歌手提供歌曲。
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    5月被诊断患有胃癌，但她仍继续进行音乐创作。
                </Typography>
            </>
        ),
    },
    {
        year: '2004',
        title: 'Melocure 首张专辑',
        content: (
            <Typography variant="body1">
                3月17日，<Artist>メロキュア</Artist>发行首张完整录音室专辑
                <Record>Melodic Hard Cure</Record>。
                这是组合在岡崎律子生前发行的唯一一张专辑。
            </Typography>
        ),
    },
    {
        year: '2004',
        title: '逝世',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    5月5日，岡崎律子因败血症性休克于东京都的医院突然去世，
                    享年44岁。
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    她在去世前仍持续进行音乐创作，并留下了部分尚未完成的作品。
                </Typography>
            </>
        ),
    },
    {
        year: '2004',
        title: '纪念专辑《for RITZ》',
        content: (
            <Typography variant="body1">
                12月29日，纪念专辑<Record>for RITZ</Record>发行。
                专辑收录了她生前创作及演唱的部分《Symphonic Rain》相关歌曲，
                由相关音乐工作者完成整理与制作。
            </Typography>
        ),
    },
    {
        year: '2005',
        title: '限定专辑《Love & Life》',
        content: (
            <Typography variant="body1">
                5月5日，歌迷俱乐部「Ritzberry Fields」发行限定专辑
                <Record>Love & Life - private works 1999-2001</Record>，
                收录她生前创作的部分私人作品及此前仅在歌迷俱乐部发行的音源。
            </Typography>
        ),
    },
    {
        year: '2019',
        title: 'Agapē 获平成アニソン大賞特别赏',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    <Artist>メロキュア</Artist>的代表作
                    <Song>Agapé</Song>入选「平成アニソン大賞」，
                    获得2000～2009年代的特别赏。
                    该曲为动画《円盤皇女ワるきゅーレ》的剧中歌。
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    这项身后荣誉也再次体现了岡崎律子的作品
                    在日本动画音乐领域持续产生的影响力。
                </Typography>
            </>
        ),
    },
];

function TimelineStep({
    item,
    last = false,
}: {
    item: BiographyEvent;
    last?: boolean;
}) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '70px 20px 1fr',
                    sm: '90px 24px 1fr',
                },
                columnGap: 1,
            }}
        >
            {/* Year */}
            <Box
                sx={{
                    textAlign: 'right',
                    pt: 0.5,
                }}
            >
                <Typography
                    variant="body2"
                    color={item.important ? 'error.main' : 'text.secondary'}
                    sx={{ fontWeight: item.important ? 700 : 500 }}
                >
                    {item.year}
                </Typography>
            </Box>

            {/* Timeline */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {/* Line */}
                {!last && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 12,
                            bottom: -24,
                            width: 2,
                            bgcolor: 'divider',
                        }}
                    />
                )}

                {/* Dot */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        width: 12,
                        height: 12,
                        mt: 0.7,
                        borderRadius: '50%',
                        bgcolor: item.important
                            ? 'error.main'
                            : 'primary.main',
                        border: '3px solid',
                        borderColor: 'background.default',
                        boxSizing: 'content-box',
                    }}
                />
            </Box>

            {/* Content */}
            <Box sx={{ pb: 4 }}>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                        lineHeight: 1.4,
                        fontWeight: item.important ? 700 : 500,
                    }}
                >
                    {item.title}
                </Typography>

                <Box sx={{ mt: 1 }}>
                    {item.content}
                </Box>
            </Box>
        </Box>
    );
}

const Biography = () =>
(

    <Box
        sx={{
            maxWidth: 900,
            mx: 'auto',
            px: { xs: 2, md: 0 },
        }}
    >
        <Typography variant="h4" sx={{ pb: 1 }}>
            详细生平
        </Typography>

        <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 1 }}
        >
            岡崎律子的生平与音乐创作历程。
        </Typography>
        <Divider sx={{ my: 1, px: 3 }} />

        <Box>
            {biography.map((item, index) => (
                <TimelineStep
                    key={`${item.year}-${index}`}
                    item={item}
                    last={index === biography.length - 1}
                />
            ))}
        </Box>
    </Box>
)

const BiographyPage = (props: PageProps) =>
    <Layout path={props.location.pathname}>
        <Grid container >
            {/* 主内容 */}
            <Grid size={{ xs: 12, md: 10 }} >
                <Biography />
            </Grid>

            {/* 侧边栏 */}
            <Grid size={{ xs: 12, md: 2 }} >
                <SideBar />
            </Grid>
        </Grid>
    </Layout>


export default BiographyPage