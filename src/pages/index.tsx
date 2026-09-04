import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import PublicIcon from "@mui/icons-material/Public"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography
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
  <Card sx={{ maxWidth: 350, mx: "auto", borderRadius: 2, overflow: 'hidden' }}>
    <CardMedia>
      <StaticImage src="../images/steps.jpg" alt="avatar" />
    </CardMedia>
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
          <AlbumCard coverImage={item.coverImage} slug={item.slug} title={item.title} />
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

  // <ImageList variant="quilted" sx={{ md: 2 }} cols={6} gap={10}>
  //   {records.map((item) => (
  //     <ImageListItem key={item.title} >
  //       <Card sx={{ borderRadius: 2 }} >
  //         <CardActionArea>
  //           <CardMedia>
  //             <CoverImage coverimage={item.coverImage} alt={item.title} style={{ width: "100%", height: "100%" }} />
  //           </CardMedia>
  //         </CardActionArea>
  //       </Card>
  //     </ImageListItem>
  //   ))}
  // </ImageList>
)

export const Head = () => <SEO title="首页" />

const Profile = () => {
  return <Container maxWidth="xl" sx={{ pb: 2 }}>
    <Typography variant="h4" gutterBottom>
      简介
    </Typography>
    <Typography >
      她于1959年12月29日,在日本长崎县出生。
      大约1982年，开始创作广告配乐。当时，曾以森野律及RITZ为名提供乐曲。
    </Typography>
    <Typography >
      1991年，为OVA动画「1月にはChristmas」演唱OP和ED成为律子跨入动漫界的第一步作品。
    </Typography>
    <Typography >她于1993年以唱作歌手的身份出道。</Typography>
    <Typography >
      最有名的歌曲是2001年为动画作品《水果篮子》演唱片头曲《For フルーツバスケット》
    </Typography>
    <Typography >
      2002年为《妹妹公主Re Pure》片尾12个小故事OP和ED作曲。其后与日向めぐみ组成了二人歌唱组合メロキュア(Melocure)，该组合的几张单曲CD取得了不错的成绩。
    </Typography>
    <Typography >
      2003年5月，硬性癌症发作。在与病魔斗争的时候继续坚持着作曲的事业。2004年，组合推出了她们的第一张专辑《Melodic Hard Cure》。2004年5月5日，她因为败血症引发的贫血休克而突然去世，享年44岁。
    </Typography>
    <Typography >
      临终前她没有办法留下遗言，遗下了她未完成的作品。一些动漫画的作者、配音演员，和大量的歌迷在网络上写下了遗憾与祝福。音乐恋爱游戏《交响乐之雨》是岡崎律子小姐最后一个全部包办的作曲项目。
    </Typography>
    <Typography >
      她的作品以抒情慢歌为主，创作的歌曲比较多元化。岡崎律子小姐的歌曲具有诗人的想象力，深刻的情感，乐观主义及纯真的特点。她的声音被认为是令人印象深刻地柔软及精细。
    </Typography>
    <Typography >
      在律子小姐短暂的一生中，写下了许多动人的乐章，大部分曲都是积极向上的，带有许多人生的感悟。
    </Typography>
  </Container>
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