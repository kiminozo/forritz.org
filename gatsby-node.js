/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require("lodash")
const { group } = require("console")

// function getId(path) {
//   let pathName = path;
//   const end = pathName.endsWith("/") ? pathName.length - 1 : pathName.length;
//   const start = pathName.substring(0, end).lastIndexOf('/')
//   return pathName.substring(start, end);
// }
Map.prototype.addListValue = function (key, value) {
  let values = this.get(key);
  if (!values) {
    values = [];
    this.set(key, values)
  }
  values.push(value);
}

const createPages = async (createPage, graphql, reporter) => {

  const result = await graphql(`
   {
  posts:allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___slug]}, limit: 1000, filter: {frontmatter: {type: {eq: null}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
  songs:allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {type: {eq: "song"}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
  records:allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {type: {eq: "record"}}}) {
    edges {
      node {
        frontmatter {
          id
          slug
        }
      }
    }
  }
  tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
  }
  categoriesGroup: allMarkdownRemark(limit: 2000, filter: {frontmatter: { type: {eq: null}}}) {
    group(field: frontmatter___categories) {
      fieldValue
      totalCount
    }
  }
  singers: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___singer) {
      fieldValue
      totalCount
    }
  }
  songWriters: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___songwriter) {
      fieldValue
      totalCount
    }
  }
  lyricWriters: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___lyricwriter) {
      fieldValue
      totalCount
    }
  }
  arrangers: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___arranger) {
      fieldValue
      totalCount
    }
  }
  recordList: allMarkdownRemark(limit: 2000, filter: {frontmatter: {type: {eq: "record"}}}) {
    group(field: frontmatter___categories) {
      fieldValue
      totalCount
      nodes {
        frontmatter {
          id
          artist
        }
      }
    }
  }
}
`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPostTemplate = require.resolve(`./src/templates/PostTemplate.tsx`)
  const posts = result.data.posts.edges;
  posts.forEach(({ node }, index, posts) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        previous: index !== 0 ? posts[index - 1].node.frontmatter.slug : null,
        next: index + 1 !== posts.length ? posts[index + 1].node.frontmatter.slug : null,
      },
    })
  })

  const songTemplate = require.resolve(`./src/templates/SongTemplate.tsx`)
  const songs = result.data.songs.edges;
  songs.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: songTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })

  const recordTemplate = require.resolve(`./src/templates/RecordTemplate.tsx`)
  const records = result.data.records.edges;
  records.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: recordTemplate,
      context: {
        id: node.frontmatter.id
        // additional data can be passed via context
        //slug: node.frontmatter.slug,
      },
    })
  })

  const tagTemplate = require.resolve("./src/templates/TagsTemplate.tsx")
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  const categoryTemplate = require.resolve("./src/templates/CategoriesTemplate.tsx")
  const categories = result.data.categoriesGroup.group;
  // Make categorie pages
  const postsPerPage = 10

  categories.forEach(category => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const path = `/categories/${_.kebabCase(category.fieldValue)}`
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? path : `${path}/${i + 1}`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          activePage: i + 1
        },
      })
    })
  })


  const staffTemplate = require.resolve("./src/templates/staff/SingerTemplate.tsx")
  const singers = result.data.singers.group;
  singers.forEach(staff => {
    createPage({
      path: `/singer/${_.kebabCase(staff.fieldValue)}/`,
      component: staffTemplate,
      context: {
        staff: staff.fieldValue,
      },
    })
  })
  const lyricWriterTemplate = require.resolve("./src/templates/staff/LyricWriterTemplate.tsx")
  const lyricWriters = result.data.lyricWriters.group;
  lyricWriters.forEach(staff => {
    createPage({
      path: `/lyric-writer/${_.kebabCase(staff.fieldValue)}/`,
      component: lyricWriterTemplate,
      context: {
        staff: staff.fieldValue,
      },
    })
  })
  const songWriterTemplate = require.resolve("./src/templates/staff/SongWriterTemplate.tsx")
  const songWriters = result.data.songWriters.group;
  songWriters.forEach(staff => {
    createPage({
      path: `/song-writer/${_.kebabCase(staff.fieldValue)}/`,
      component: songWriterTemplate,
      context: {
        staff: staff.fieldValue,
      },
    })
  })
  const arrangerTemplate = require.resolve("./src/templates/staff/ArrangerTemplate.tsx")
  const arrangers = result.data.arrangers.group;
  arrangers.forEach(staff => {
    createPage({
      path: `/arranger/${_.kebabCase(staff.fieldValue)}/`,
      component: arrangerTemplate,
      context: {
        staff: staff.fieldValue,
      },
    })
  })

  const recordListTemplate = require.resolve("./src/templates/RecordListTemplate.tsx")
  const discographyTemplate = require.resolve("./src/templates/DiscographyTemplate.tsx")
  const recordGroups = result.data.recordList.group;
  const artistMap = new Map();
  recordGroups.forEach(recordGroup => {
    const category = recordGroup.fieldValue;
    const frontmatters = recordGroup.nodes.map(p => p.frontmatter);
    const g = _.groupBy(frontmatters, p => p.artist);
    const recordsMap = _.map(g, (value, key) => ({ artist: key, records: value }));
    if (recordsMap.length == 1) {
      //主分类
      const { artist, records } = recordsMap[0];
      artistMap.addListValue(artist, { category: category, records: records });
      createPage({
        path: `/discography/${_.kebabCase(category)}/`,
        component: recordListTemplate,
        context: {
          title: category,
          categories: Array.of(category),
          artist: artist,
          discographyIds: records.map(p => p.id)
        },
      })
    } else {
      //子分类
      createPage({
        path: `/discography/${_.kebabCase(category)}/`,
        component: discographyTemplate,
        context: {
          category: category
        },
      });
      //歌手
      recordsMap.forEach(({ artist, records }) => {
        createPage({
          path: `/discography/${_.kebabCase(artist)}/`,
          component: recordListTemplate,
          context: {
            title: artist,
            categories: Array.of(category),
            artist: artist,
            discographyIds: records.map(p => p.id)
          },
        })
      });

    }
  });


  for (let [key, value] of artistMap.entries()) {
    if (value.length == 1) {
      continue;
    }
    const artist = key;
    const categories = value.map(p => p.category);
    const recordIds = value.flatMap(p => p.records).map(p => p.id);
    createPage({
      path: `/discography/${_.kebabCase(artist)}/`,
      component: recordListTemplate,
      context: {
        title: artist,
        categories: categories,
        artist: artist,
        discographyIds: recordIds
      },
    })
  }


}




exports.createPages = async ({
  actions,
  graphql,
  reporter
}) => {
  const {
    createPage
  } = actions

  await createPages(createPage, graphql, reporter);

}

