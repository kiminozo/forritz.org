import React from "react"
import { Link, PageProps, graphql } from "gatsby"
import { SEO, Layout, CoverImage } from "../components"
import { StaticImage } from "gatsby-plugin-image"
import {
  Grid,
  Divider,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box
} from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import PublicIcon from "@mui/icons-material/Public"
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
  <Card sx={{ maxWidth: 345, mx: "auto" }}>
    <CardMedia>
      <StaticImage src="../images/steps.jpg" alt="avatar" />
    </CardMedia>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        岡崎律子
      </Typography>
      <Divider />
      <Typography variant="subtitle1" color="text.secondary">
        1959 ~ 2004
      </Typography>
      <List dense>
        <ListItem><ListItemText primary="別名 森野律 RITZ" /></ListItem>
        <ListItem><ListItemText primary="出生 1959年12月29日" /></ListItem>
        <ListItem><ListItemText primary="祭日 2004年5月5日（44岁）" /></ListItem>
        <ListItem><ListItemText primary="血型 B型" /></ListItem>
        <ListItem><ListItemText primary="出身地 日本長崎県西彼杵郡高島町" /></ListItem>
        <ListItem><ListItemText primary="流派 animation" /></ListItem>
        <ListItem><ListItemText primary="职业 作曲家 唱作歌手" /></ListItem>
        <ListItem><ListItemText primary="担当乐器 Vocal、Piano" /></ListItem>
        <ListItem><ListItemText primary="活動期間 1985年 – 2004年" /></ListItem>
        <ListItem><ListItemText primary="事务所 STAR CHILD" /></ListItem>
      </List>
    </CardContent>
    <CardActions>
      <Button
        href="http://love.life.coocan.jp"
        target="_blank"
        startIcon={<PublicIcon />}
        size="small"
        variant="outlined"
      >
        岡崎律子Book
      </Button>
    </CardActions>
  </Card>
)

// 专辑卡列表
const AlbumCard = ({ records }: { records: Record[] }) => (
  <ImageList sx={{ width: "100%", height: "auto" }} cols={6} gap={8}>
    {records.map((item) => (
      <ImageListItem key={item.title} style={{ width: "100px", height: "100px" }}>
        <CoverImage coverimage={item.coverImage} alt={item.title} />
        <ImageListItemBar
          title={item.title}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    ))}
  </ImageList>
)

export const Head = () => <SEO title="首页" />

const IndexPage = (props: Props) => (
  <Layout path={props.location.pathname}>
    <Grid container spacing={2}>
      {/* 左侧个人卡 */}
      <Grid size={{ xs: 12, md: 3 }}>
        <RitzCard />
      </Grid>

      {/* 右侧内容 */}
      <Grid size={{ xs: 12, md: 9 }} >
        <Box sx={{ mb: 2 }}>
          <Typography >
            ●她于1959年12月29日,在日本长崎县出生。
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
          <Typography >●刚接触岡崎律子的新人粉丝的指南：</Typography>

          <List>
            <ListItem component={Link} to="/performance">
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="『岡崎律子小姐的音乐年表』" />
            </ListItem>
            <ListItem component={Link} to="/biography">
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="『岡崎律子小姐的详细生平』" />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h4" gutterBottom>
          唱片集
        </Typography>
        <AlbumCard records={props.data.records.nodes.map(p => p.frontmatter)} />
        <Divider sx={{ my: 3 }} />

        <Button
          component={Link}
          to="/discography"
          variant="outlined"
          endIcon={<ArrowRightIcon />}
        >
          了解更多
        </Button>
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