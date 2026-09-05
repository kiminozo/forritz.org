import * as React from 'react';
import {
    Box,
    Chip,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { Layout, SEO } from "../components"


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
            <>
                <Typography variant="body1">
                    12月29日，岡崎律子出生于日本长崎县。她天生左撇子，但因母亲十分介意，
                    幼年时被纠正为右手使用。
                </Typography>
            </>
        ),
    },
    {
        year: '小学～中学',
        title: '东京生活',
        content: (
            <Typography variant="body1">
                岡崎律子曾两次转学。小学三年级时随家人从长崎搬至东京，并很快适应了新的生活环境。
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
                    「エレナー」。
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Chip label="雨がくれたもの" size="small" />
                </Box>
            </>
        ),
    },
    {
        year: '大学～短期大学',
        title: '音乐与面包店',
        content: (
            <Typography variant="body1">
                在文化祭等活动中发表自己的作品，同时参加羽毛球部。
                进入短期大学后，主要将时间投入面包店兼职以及「エレナー」的音乐活动。
            </Typography>
        ),
    },
    {
        year: '约1982',
        title: '开始职业音乐生涯',
        content: (
            <Typography variant="body1">
                短期大学毕业后曾在普通企业工作。约1982年开始正式从事音乐创作，
                最初主要为广告创作音乐，并曾使用「森野律」及「Ritz」等名义发表作品。
            </Typography>
        ),
    },
    {
        year: '1985',
        title: '作品首次被收录',
        content: (
            <Typography variant="body1">
                创作的歌曲首次被其他音乐人的唱片收录，包括鲇川麻弥专辑
                《Candy Game》中的《シークレット・ラブ》。
            </Typography>
        ),
    },
    {
        year: '1991',
        title: '进入动画音乐领域',
        content: (
            <Typography variant="body1">
                开始参与动画音乐，为OVA《1月にはChristmas》演唱主题歌曲，
                成为她进入动画音乐领域的重要契机。
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
                    并在最终回演唱自己创作的《約束》。
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Chip label="4月の雪" size="small" sx={{ mr: 0.5 }} />
                    <Chip label="約束" size="small" />
                </Box>
            </>
        ),
    },
    {
        year: '1993',
        title: '个人歌手出道',
        content: (
            <Typography variant="body1">
                3月3日，以单曲《悲しい自由》正式作为创作歌手出道。
                3月24日发行首张个人专辑《Sincerely yours》。
            </Typography>
        ),
    },
    {
        year: '1994～1997',
        title: '个人音乐活动',
        content: (
            <Typography variant="body1">
                相继发行《Joyful Calendar》《A Happy Life》《Ritzberry Fields》等个人专辑，
                逐渐形成兼具作词、作曲与演唱能力的个人音乐风格。
            </Typography>
        ),
    },
    {
        year: '1995',
        title: '动画歌曲创作',
        content: (
            <Typography variant="body1">
                参与《爱天使传说Wedding Peach》的音乐创作，为主题曲《夢見る愛天使》作曲，
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
                并演唱《シンシア・愛する人》。
            </Typography>
        ),
    },
    {
        year: '2000',
        title: 'Love Hina',
        content: (
            <Typography variant="body1">
                全面参与动画《Love Hina》的音乐创作，负责主题曲及大量相关歌曲的作词、作曲，
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
                    为动画《水果篮子》创作并演唱主题曲《For フルーツバスケット》，
                    同时创作作品中的多首歌曲。
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    这首歌成为她最具代表性的作品之一，也使她在海外动画爱好者中获得更广泛的知名度。
                </Typography>
            </>
        ),
    },
    {
        year: '2002',
        title: 'Princess Tutu',
        content: (
            <Typography variant="body1">
                参与《Sister Princess RePure》的音乐创作，为十二位角色分别创作主题歌曲。
                同年为《プリンセスチュチュ》创作并演唱主题曲，并发行相关专辑《Morning Grace》。
            </Typography>
        ),
    },
    {
        year: '2003',
        title: 'Symphonic Rain',
        important: true,
        content: (
            <>
                <Typography variant="body1">
                    参与工画堂制作的音乐游戏《Symphonic Rain》，负责大量歌曲的创作。
                    其中主题曲《空の向こうに》和片尾曲《涙がほおを流れても》均由她亲自演唱。
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Chip label="Symphonic Rain" size="small" />
                    <Chip label="空の向こうに" size="small" sx={{ ml: 0.5 }} />
                </Box>
            </>
        ),
    },
    {
        year: '2003～2004',
        title: 'Melocure',
        content: (
            <Typography variant="body1">
                与日向惠组成双人音乐组合「メロキュア（Melocure）」，
                推出多张单曲，并于2004年发行组合专辑《Melodic Hard Cure》。
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
                    5月5日，岡崎律子因败血症性休克于东京都中央区的医院去世，享年44岁。
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    她去世时仍有部分作品尚未完成。
                </Typography>
            </>
        ),
    },
    {
        year: '2004',
        title: '《for RITZ》',
        content: (
            <Typography variant="body1">
                12月29日，纪念专辑《for RITZ》发行。
                专辑收录了她生前留下的部分未完成作品，并由相关音乐工作者完成编曲。
                其中多数歌曲来自《Symphonic Rain》。
            </Typography>
        ),
    },
    {
        year: '2005',
        title: '《Love & Life》',
        content: (
            <Typography variant="body1">
                5月5日，歌迷俱乐部「Ritzberry Fields」发行限定专辑
                《Love & Life ～private works 1999-2001～》，
                收录她生前创作的部分私人作品及未公开音源。
            </Typography>
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
                    component="h2"
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

export default function BiographyPage() {
    return (
        <Layout>

            <Box
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    px: { xs: 2, md: 0 },
                    py: 4,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    详细生平
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 5 }}
                >
                    岡崎律子的生平与音乐创作历程。
                </Typography>

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
        </Layout>
    );
}