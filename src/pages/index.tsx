import React from "react"
import { Link, PageProps, graphql } from "gatsby"
import { Card, Icon, Image, Label, Button, Grid, Divider, Header, List, Container } from 'semantic-ui-react'

import { SEO, Layout, CoverImage } from "../components";

//import logo from "../images/avatar/steps.jpg"
//import demo from "../images/demo.png"
import { StaticImage } from "gatsby-plugin-image"

import "./index.sass"
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

const RitzCard = () => (
  <Card centered>
    {/* <Image src={logo} wrapped ui={false} /> */}
    <StaticImage src="../images/steps.jpg" alt="avatar" />
    <Card.Content>
      <Card.Header>岡崎律子</Card.Header>
      <Card.Meta>
        <span className='date'>1959 ~ 2004</span>
      </Card.Meta>
      <Card.Description>
        <List>
          <List.Item>別名 森野律 RITZ</List.Item>
          <List.Item>出生 1959年12月29日</List.Item>
          <List.Item>祭日 2004年5月5日（44岁）</List.Item>
          <List.Item>血型 B型</List.Item>
          <List.Item>出身地 日本長崎県西彼杵郡高島町</List.Item>
          <List.Item>流派 animation</List.Item>
          <List.Item>职业 作曲家 唱作歌手</List.Item>
          <List.Item>担当乐器 Vocal、Piano</List.Item>
          <List.Item>活動期間 1985年 – 2004年</List.Item>
          <List.Item>事务所 STAR CHILD</List.Item>
        </List>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button as="a" basic color='blue'
        href="http://love.life.coocan.jp" target="_Blank"
        icon='world' content='岡崎律子Book' labelPosition='left' />
    </Card.Content>
  </Card >
)


const AlbumCard = ({ records }: { records: Record[] }) => (
  <Card.Group itemsPerRow={6} doubling>
    {records.map(item =>
    (
      <Card as={Link} key={item.title} to={item.slug}>
        <CoverImage key={item.title} alt={item.title} coverimage={item.coverImage} />
        {/* <Label attached='bottom left'>{item.title}</Label> */}
      </Card>
    )
    )}
    {/* <Card image={demo} />
    <Card image={demo} />*/}
  </Card.Group>
)

export const Head = () => <SEO title="首页" />

const IndexPage = (props: Props) => (
  <Layout path={props.location.pathname}>
    <Grid>
      <Grid.Column mobile={16} computer={4} tablet={5}>
        <RitzCard />
      </Grid.Column>
      <Grid.Column mobile={16} computer={12} tablet={12}>
        <p>●她于1959年12月29日,在日本长崎县出生。<br />
          大约1982年，开始创作广告配乐。当时，曾以森野律及RITZ为名提供乐曲。<br />
          1991年，为OVA动画「1月にはChristmas」演唱OP和ED成为律子跨入动漫界的第一步作品。</p>
        <p>她于1993年以唱作歌手的身份出道。</p>
        <p>最有名的歌曲是2001年为动画作品《水果篮子》演唱片头曲《For フルーツバスケット》</p>
        <p> 2002年为《妹妹公主Re Pure》片尾12个小故事OP和ED作曲。<br />
          其后与日向めぐみ组成了二人歌唱组合メロキュア(Melocure)，该组合的几张单曲CD取得了不错的成绩。<br />
          2003年5月，硬性癌症发作。在与病魔斗争的时候继续坚持着作曲的事业。<br />
          2004年，组合推出了她们的第一张专辑《Melodic Hard Cure》。<br />
          2004年5月5日，她因为败血症引发的贫血休克而突然去世，享年44岁。</p>
        <p>临终前她没有办法留下遗言，遗下了她未完成的作品。一些动漫画的作者、配音演员，和大量的歌迷在网络上写下了遗憾与祝福。<br />
          音乐恋爱游戏《交响乐之雨》是岡崎律子小姐最后一个全部包办的作曲项目。</p>
        <p>她的作品以抒情慢歌为主，创作的歌曲比较多元化。岡崎律子小姐的歌曲具有诗人的想象力，深刻的情感，乐观主义及纯真的特点。她的声音被认为是令人印象深刻地柔软及精细。</p>
        <p>在律子小姐短暂的一生中，写下了许多动人的乐章，大部分曲都是积极向上的，带有许多人生的感悟。</p>
        <p>●刚接触岡崎律子的新人粉丝的指南：</p>
        <List>
          <List.Item>
            <Icon name='triangle right' />
            <List.Content>
              『<Link to="/performance">岡崎律子小姐的音乐年表</Link>』
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name='triangle right' />
            <List.Content>
              『<Link to="/biography">岡崎律子小姐的详细生平</Link>』
            </List.Content>
          </List.Item>
        </List>
        <Divider />
        <Header as='h2' content="唱片集" />
        <AlbumCard records={props.data.records.nodes.map(p => p.frontmatter)} />
        <Divider hidden />

        <Button as={Link} basic color='blue' to="/discography" icon labelPosition='right'>
          了解更多
          <Icon name='arrow right' />
        </Button>
      </Grid.Column>
    </Grid >

  </Layout >
)

export default IndexPage

export const query = graphql`{
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