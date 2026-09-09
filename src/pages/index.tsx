import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import PublicIcon from "@mui/icons-material/Public"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Stack,
  Link
} from "@mui/material"
import { Link as GLink, PageProps, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import { Layout, SEO } from "../components"
import AlbumCard from "../components/AlbumCard"

interface Record {
  coverImage: string
  title: string
  slug: string
}

interface Props extends PageProps {
  data: {
    records: {
      nodes: {
        frontmatter: Record
      }[]
    }
  }
}

// 个人简介卡
const RitzCard = () => (
  <Card sx={{ maxWidth: 350, mx: "auto", boxShadow: 2, borderRadius: 2, overflow: 'hidden' }}>
    <CardMedia>
      <StaticImage src="../images/steps.jpg" alt="avatar" />
    </CardMedia>
    <Divider />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h5">
        岡崎律子
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        1959 ~ 2004
      </Typography>
      <Typography variant="body1" color="text.secondary">
        別名: 森野律 RITZ
      </Typography>
      <Typography variant="body1" color="text.secondary">
        出生: 1959年12月29日
      </Typography>
      <Typography variant="body1" color="text.secondary">
        祭日: 2004年5月5日(44岁)
      </Typography>
      <Typography variant="body1" color="text.secondary">
        血型: B型
      </Typography>
      <Typography variant="body1" color="text.secondary">
        出身地: 日本 長崎県 端島
      </Typography>
      <Typography variant="body1" color="text.secondary">
        流派: animation
      </Typography>
      <Typography variant="body1" color="text.secondary">
        职业: 作曲家 唱作歌手
      </Typography>
      <Typography variant="body1" color="text.secondary">
        担当乐器: Vocal、Piano
      </Typography>
      <Typography variant="body1" color="text.secondary">
        活动期间: 1985年 – 2004年
      </Typography>
      <Typography variant="body1" color="text.secondary">
        事务所: STAR CHILD
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        href="http://love.life.coocan.jp"
        target="_blank"
        startIcon={<PublicIcon />}
        size="small"
        variant="outlined"
        sx={{ mx: 1, width: '100%' }}
      >
        岡崎律子Book
      </Button>
    </CardActions>
  </Card>
)



// 专辑卡列表
const AlbumCardList = ({ records }: { records: Record[] }) => (
  <Container maxWidth="xl" sx={{ pb: 4 }}>
    <Typography variant="h4" gutterBottom>
      唱片集
    </Typography>
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {records.map((item) => (
        <Grid key={item.title} size={{ xs: 6, sm: 4, md: 2 }}>
          <AlbumCard coverImage={item.coverImage} slug={item.slug} title={item.title} scales="crop" />
        </Grid>
      ))}
    </Grid >
    <Button
      component={GLink}
      to="/discography"
      variant="outlined"
      sx={{ my: 3 }}
      endIcon={<ArrowRightIcon />}
    >
      了解更多
    </Button>
  </Container>
)

export const Head = () => <SEO title="首页" />

const Profile = () => {
  return <Container maxWidth="xl" sx={{ pb: 2 }}>
    <Typography variant="h4" gutterBottom>
      简介
    </Typography>
    <Typography
      variant="body1"
      sx={{
        "& br": {
          display: "block",
          content: '""',
          marginBottom: 3,
        },
      }}
    >
      岡崎律子（1959年12月29日－2004年5月5日），日本作曲家、唱作歌手。
      <br />
      出生于长崎县端岛（军舰岛），高中时期便开始音乐创作。进入音乐行业后，
      曾以「森野律」等名义创作广告音乐，并为众多动画、游戏及歌手提供作品。
      <br />
      1993年正式以唱作歌手身份出道。此后与林原めぐみ、飯塚雅弓、井上喜久子、堀江由衣、小森まなみ等众多歌手及声优合作，
      创作领域涵盖动画、游戏及个人音乐的大量作品。
      她的音乐旋律温柔细腻，歌词富有诗意与真挚的情感。
      <br />
      2001年，她为动画《水果篮子》创作并演唱最广为流传的片头曲《For フルーツバスケット》，
      此后又与日向めぐみ组成音乐组合「メロキュア」。
      <br />
      在游戏音乐方面，她参与了音乐恋爱游戏《交响乐之雨》的整体音乐创作，
      负责作曲、作词及主题曲演唱等工作，这也是她生前最后完整参与的游戏音乐项目。
      <br />
      2003年被诊断患有胃癌，仍坚持音乐创作，翌年因败血症性休克去世，享年44岁。
      <br />
      2019年，《Agapē》与《残酷な天使のテーゼ》并列获得「平成アニソン大賞」综合大赏。
      这首作品也成为她逝世15年后，音乐仍持续被聆听与认可的见证。
      <br />
      短暂的一生中，她以细腻而真挚的音乐留下了独特的印记，<br />
      而那些温柔的旋律，也在岁月流逝后依然被人反复聆听与铭记。 <br />
    </Typography>


    <Stack
      direction="column"
      spacing={1}
      sx={{ mt: 3 }}
    >
      <Link component={GLink} underline="hover" to="/performance/">
        <ArrowForwardIosIcon sx={{ fontSize: "0.8em" }} />
        岡崎律子小姐的音乐年表
      </Link>

      <Link component={GLink} underline="hover" to="/biography/">
        <ArrowForwardIosIcon sx={{ fontSize: "0.8em" }} />
        岡崎律子小姐的详细生平
      </Link>
    </Stack>

  </Container >
}

const IndexPage = (props: Props) => (
  <Layout path={props.location.pathname}>
    <Grid container spacing={2}>
      {/* 左侧个人卡 */}
      <Grid size={{ xs: 12, md: 3 }}>
        <RitzCard />
      </Grid>

      {/* 右侧内容 */}
      <Grid size={{ xs: 12, md: 9 }} >
        <Profile />
        <Divider sx={{ my: 3 }} />
        <AlbumCardList records={props.data.records.nodes.map(p => p.frontmatter)} />
      </Grid>
    </Grid>
  </Layout>
)

export default IndexPage

export const query = graphql`
{
  records: allMarkdownRemark(
    filter: {frontmatter: {id: {in: ["sincerely-yours", "joyful-calendar", "a-happy-life", "ritzberry-fields", "rain-or-shine", "ohayou", "lovehina-okazaki-collection", "life-is-lovely", "for-ritz", "love-and-life", "morning-grace", "melodic-hard-cure"]}, type: {eq: "record"}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      frontmatter {
        coverImage
        title
        slug
      }
    }
  }
}`