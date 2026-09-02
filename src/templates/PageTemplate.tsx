// import React, {
//   Component,
//   createRef,
// } from "react"

// import { graphql } from "gatsby"

// import {
//   SEO,
//   Layout,
//   TagsLine,
//   CC,
//   License,
// } from "../components"

// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Typography,
// } from "@mui/material"

// type Headings = {
//   depth: number
//   id: string
//   value: string
// }

// type Item = {
//   h: Headings
//   child: Headings[]
// }

// type TemplateProps = {
//   data: {
//     markdownRemark: {
//       frontmatter: {
//         title: string
//         slug: string
//         date?: string
//         categories?: string[]
//         tags?: string[]
//         license?: License
//       }
//       html: string
//       headings: Headings[]
//     }
//   }
// }

// type TemplateState = {
//   activeId: string
// }

// type HeaderInfo = {
//   id: string
//   offset: number
// }

// const sidebarStyle = {
//   backgroundColor: "background.paper",
//   boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
//   px: 2,
//   py: 1,
// }

// // class TemplatePage extends Component<
// //   TemplateProps,
// //   TemplateState
// // > {
// //   contextRef = createRef<HTMLDivElement>()

// //   headerInfos: HeaderInfo[] = []


// //   constructor(props: Readonly<TemplateProps>) {
// //     super(props)

// //     this.state = {
// //       activeId: "",
// //     }
// //   }

// //   componentDidMount() {
// //     if (!this.props.data.markdownRemark.frontmatter.toc) {
// //       return
// //     }

// //     this.setupHeadingsObserver()
// //   }

// //   componentWillUnmount() {
// //     this.observer?.disconnect()
// //   }

// //   setupHeadingsObserver = () => {
// //     const { headings } = this.props.data.markdownRemark

// //     if (!headings.length) {
// //       return
// //     }

// //     const elements = headings
// //       .map((heading) =>
// //         document.getElementById(heading.id)
// //       )
// //       .filter(
// //         (element): element is HTMLElement =>
// //           element !== null
// //       )

// //     if (!elements.length) {
// //       return
// //     }

// //     this.headerInfos = elements.map((element) => ({
// //       id: element.id,
// //       offset:
// //         element.getBoundingClientRect().top +
// //         window.scrollY,
// //     }))

// //     this.observer = new IntersectionObserver(
// //       (entries) => {
// //         const visibleHeadings = entries
// //           .filter((entry) => entry.isIntersecting)
// //           .sort(
// //             (a, b) =>
// //               a.boundingClientRect.top -
// //               b.boundingClientRect.top
// //           )

// //         if (visibleHeadings.length > 0) {
// //           this.setState({
// //             activeId: visibleHeadings[0].target.id,
// //           })
// //         }
// //       },
// //       {
// //         rootMargin: "-80px 0px -70% 0px",
// //         threshold: 0,
// //       }
// //     )

// //     elements.forEach((element) => {
// //       this.observer?.observe(element)
// //     })
// //   }

// //   renderMenu(headings: Headings[]) {
// //     if (headings.length === 0) {
// //       return null
// //     }

// //     const { activeId } = this.state

// //     const h1s: Item[] = []
// //     let h1: Item | null = null

// //     headings.forEach((h) => {
// //       if (h.depth === 1) {
// //         h1 = {
// //           h,
// //           child: [],
// //         }

// //         h1s.push(h1)
// //       } else if (h.depth === 2 && h1) {
// //         h1.child.push(h)
// //       }
// //     })

// //     return (
// //       <Container>
// //         <Box
// //           sx={{
// //             position: "sticky",
// //             top: 20,
// //           }}
// //         >
// //           <Box sx={sidebarStyle}>
// //             <List
// //               disablePadding
// //               sx={{
// //                 width: "100%",
// //               }}
// //             >
// //               {h1s.map((item) => (
// //                 <React.Fragment key={item.h.id}>
// //                   <ListItem
// //                     disablePadding
// //                     sx={{
// //                       fontWeight:
// //                         item.h.id === activeId
// //                           ? "bold"
// //                           : "normal",
// //                     }}
// //                   >
// //                     <ListItemText
// //                       primary={item.h.value}
// //                       primaryTypographyProps={{
// //                         fontWeight:
// //                           item.h.id === activeId
// //                             ? 700
// //                             : 400,
// //                       }}
// //                     />
// //                   </ListItem>

// //                   {item.child.length > 0 && (
// //                     <List
// //                       disablePadding
// //                       sx={{
// //                         pl: 2,
// //                       }}
// //                     >
// //                       {item.child.map((h2) => (
// //                         <ListItem
// //                           key={h2.id}
// //                           disablePadding
// //                         >
// //                           <ListItemButton
// //                             component="a"
// //                             href={`#${h2.id}`}
// //                             selected={
// //                               h2.id === activeId
// //                             }
// //                             sx={{
// //                               py: 0.5,
// //                               px: 1,
// //                             }}
// //                           >
// //                             <ListItemText
// //                               primary={h2.value}
// //                               primaryTypographyProps={{
// //                                 fontSize:
// //                                   "0.9rem",
// //                               }}
// //                             />
// //                           </ListItemButton>
// //                         </ListItem>
// //                       ))}
// //                     </List>
// //                   )}
// //                 </React.Fragment>
// //               ))}
// //             </List>
// //           </Box>
// //         </Box>
// //       </Container>
// //     )
// //   }

// //   renderTags() {
// //     const { markdownRemark } = this.props.data

// //     const {
// //       categories,
// //       tags,
// //       license,
// //     } = markdownRemark.frontmatter

// //     return (
// //       <>
// //         <Divider sx={{ my: 3 }} />

// //         <TagsLine
// //           categories={categories}
// //           tags={tags}
// //         />

// //         <CC license={license} />
// //       </>
// //     )
// //   }

// //   render() {
// //     const { markdownRemark } = this.props.data

// //     const {
// //       frontmatter,
// //       html,
// //       headings,
// //     } = markdownRemark

// //     const body = (
// //       <Grid container>
// //         <Grid
// //           size={{
// //             xs: 12,
// //             md: 10,
// //           }}
// //           ref={this.contextRef}
// //         >
// //           <Typography
// //             variant="h1"
// //             component="h1"
// //           >
// //             {frontmatter.title}
// //           </Typography>

// //           <Divider sx={{ my: 2 }} />

// //           {/*
// //           <Typography component="p">
// //             {frontmatter.date}
// //           </Typography>
// //           */}

// //           <Box
// //             className="blog-post-content"
// //             dangerouslySetInnerHTML={{
// //               __html: html,
// //             }}
// //           />

// //           {this.renderTags()}

// //           {frontmatter.toc &&
// //             this.renderMenu(headings)}
// //         </Grid>
// //       </Grid>
// //     )

// //     return <Layout>{body}</Layout>
// //   }
// // }

// export default function Template({
//   data,
// }: TemplateProps) {
//   //return <TemplatePage data={data} />
//   return <div/>
// }

// export const Head = (props: TemplateProps) => (
//   <SEO
//     title={
//       props.data.markdownRemark.frontmatter.title
//     }
//   />
// )

// export const pageQuery = graphql`
//   query ($slug: String!) {
//     markdownRemark(
//       frontmatter: {
//         slug: { eq: $slug }
//       }
//     ) {
//       html

//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         slug
//         title
//         categories
//         tags

//         license {
//           type
//           author
//           translator
//           reproduced_url
//           reproduced_website
//         }
//       }

//       headings {
//         depth
//         id
//         value
//       }
//     }
//   }
// `
