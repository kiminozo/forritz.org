import type { GatsbyNode } from 'gatsby';
import path from 'node:path';
import _ from 'lodash';

interface Frontmatter {
  id?: string;
  title?: string;
  slug?: string;
  quote?: string;
  artist?: string;
  date?: string;
}

interface MarkdownNode {
  frontmatter: Frontmatter;
  fields?: {
    songYear?: string;
    songReleaseDate?: string;
  };
}

interface MarkdownEdge {
  node: MarkdownNode;
}

interface GroupNode {
  fieldValue: string;
  totalCount: number;
  nodes: MarkdownNode[];
}

interface GraphQLResult {
  metas: {
    nodes: MarkdownNode[];
  };

  posts: {
    edges: MarkdownEdge[];
  };

  songs: {
    edges: MarkdownEdge[];
  };

  records: {
    edges: MarkdownEdge[];
  };

  tagsGroup: {
    group: GroupNode[];
  };

  categoriesGroup: {
    group: GroupNode[];
  };

  vocals: {
    group: GroupNode[];
  };

  composers: {
    group: GroupNode[];
  };

  lyricists: {
    group: GroupNode[];
  };

  arrangers: {
    group: GroupNode[];
  };

  recordList: {
    group: GroupNode[];
  };

}

interface PaginationOptions {
  path: string;
  component: string;
  context?: Record<string, unknown>;
  postsPerPage: number;
  totalCount: number;
}

interface ArtistRecordGroup {
  category: string;
  records: Frontmatter[];
}


export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;
  /**
   * 创建分页页面
   */
  const createPageWithPagination = ({
    path,
    component,
    context = {},
    postsPerPage,
    totalCount,
  }: PaginationOptions) => {
    const numPages = Math.ceil(totalCount / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? path : `${path}/${i + 1}/`,
        component,
        context: {
          ...context,
          basePath: path,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          activePage: i + 1,
        },
      });
    });
  };

  /**
   * GraphQL
   */
  const result = await graphql<GraphQLResult>(`{
  metas: allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {type: {eq: "meta"}}}
  ) {
    nodes {
      frontmatter {
        title
        id
      }
    }
  }
  posts: allMarkdownRemark(
    sort: {frontmatter: {slug: ASC}}
    limit: 1000
    filter: {frontmatter: {type: {eq: null}}}
  ) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
  songs: allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit: 1000
    filter: {frontmatter: {type: {eq: "song"}}}
  ) {
    edges {
      node {
        frontmatter {
          slug
          quote
        }
      }
    }
  }
  records: allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit: 1000
    filter: {frontmatter: {type: {eq: "record"}}}
  ) {
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
    group(field: {frontmatter: {tags: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  categoriesGroup: allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {type: {eq: null}}}
  ) {
    group(field: {frontmatter: {categories: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  vocals: allMarkdownRemark(limit: 2000) {
    group(field: {frontmatter: {vocal: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  composers: allMarkdownRemark(limit: 2000) {
    group(field: {frontmatter: {composer: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  lyricists: allMarkdownRemark(limit: 2000) {
    group(field: {frontmatter: {lyricist: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  arrangers: allMarkdownRemark(limit: 2000) {
    group(field: {frontmatter: {arranger: SELECT}}) {
      fieldValue
      totalCount
    }
  }
  recordList: allMarkdownRemark(
    limit: 2000
    filter: {frontmatter: {type: {eq: "record"}}}
  ) {
    group(field: {frontmatter: {categories: SELECT}}) {
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
}`)

  /**
   * GraphQL 错误
   */
  if (result.errors) {
    reporter.panicOnBuild(
      'Error while running GraphQL query.',
      result.errors,
    );

    return;
  }



  const data = result?.data;

  if (!data) {
    reporter.panicOnBuild(`GraphQL returned no data. ${result.data}`);
    return;
  }

  /**
   * Meta
   */
  const metas = data.metas.nodes.map(
    (node) => node.frontmatter,
  );

  const getMetaId = (title: string): string => {
    return (
      metas.find((meta) => meta.title === title)?.id ??
      _.kebabCase(title)
    );
  };

  /**
   * =========================
   * Blog Posts
   * =========================
   */
  const blogPostTemplate = path.resolve(
    './src/templates/PostTemplate.tsx',
  );

  const posts = data.posts.edges;

  posts.forEach(({ node }, index) => {
    const slug = node.frontmatter.slug;

    if (!slug) {
      return;
    }

    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug,

        previous:
          index !== 0
            ? posts[index - 1].node.frontmatter.slug
            : null,

        next:
          index + 1 !== posts.length
            ? posts[index + 1].node.frontmatter.slug
            : null,
      },
    });
  });

  /**
   * =========================
   * Songs
   * =========================
   */
  const songTemplate = path.resolve(
    './src/templates/SongTemplate.tsx',
  );

  const songs = data.songs.edges;

  songs.forEach(({ node }) => {
    const { slug, quote } = node.frontmatter;

    if (!slug) {
      return;
    }

    createPage({
      path: slug,
      component: songTemplate,
      context: {
        slug,
        quote,
      },
    });
  });

  /**
   * =========================
   * Records
   * =========================
   */
  const recordTemplate = path.resolve(
    './src/templates/RecordTemplate.tsx',
  );

  const records = data.records.edges;

  records.forEach(({ node }) => {
    const { id, slug } = node.frontmatter;

    if (!id || !slug) {
      return;
    }

    createPage({
      path: slug,
      component: recordTemplate,
      context: {
        id,
      },
    });
  });

  /**
   * =========================
   * Tags
   * =========================
   */
  const tagTemplate = path.resolve(
    './src/templates/TagsTemplate.tsx',
  );

  const tags = data.tagsGroup.group;

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  /**
   * =========================
   * Categories
   * =========================
   */
  const categoryTemplate = path.resolve(
    './src/templates/CategoriesTemplate.tsx',
  );

  const categories = data.categoriesGroup.group;

  categories.forEach((category) => {
    createPageWithPagination({
      path: `/category/${getMetaId(category.fieldValue)}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
      postsPerPage: 10,
      totalCount: category.totalCount,
    });
  });

  /**
   * =========================
   * Staff
   * =========================
   */
  const staffPerPage = 20;

  /**
   * vocals
   */
  const staffTemplate = path.resolve(
    './src/templates/staff/VocalTemplate.tsx',
  );

  data.vocals.group.forEach((staff) => {
    createPageWithPagination({
      path: `/vocal/${_.kebabCase(staff.fieldValue)}`,
      component: staffTemplate,
      context: {
        staff: staff.fieldValue,
      },
      postsPerPage: staffPerPage,
      totalCount: staff.totalCount,
    });
  });

  /**
   * Lyric Writers
   */
  const lyricistTemplate = path.resolve(
    './src/templates/staff/LyricistTemplate.tsx',
  );

  data.lyricists.group.forEach((staff) => {
    createPageWithPagination({
      path: `/lyricist/${_.kebabCase(staff.fieldValue)}`,
      component: lyricistTemplate,
      context: {
        staff: staff.fieldValue,
      },
      postsPerPage: staffPerPage,
      totalCount: staff.totalCount,
    });
  });

  /**
   * Song Writers
   */
  const composerTemplate = path.resolve(
    './src/templates/staff/ComposerTemplate.tsx',
  );

  data.composers.group.forEach((staff) => {
    createPageWithPagination({
      path: `/composer/${_.kebabCase(staff.fieldValue)}`,
      component: composerTemplate,
      context: {
        staff: staff.fieldValue,
      },
      postsPerPage: staffPerPage,
      totalCount: staff.totalCount,
    });
  });

  /**
   * Arrangers
   */
  const arrangerTemplate = path.resolve(
    './src/templates/staff/ArrangerTemplate.tsx',
  );

  data.arrangers.group.forEach((staff) => {
    createPageWithPagination({
      path: `/arranger/${_.kebabCase(staff.fieldValue)}`,
      component: arrangerTemplate,
      context: {
        staff: staff.fieldValue,
      },
      postsPerPage: staffPerPage,
      totalCount: staff.totalCount,
    });
  });

  /**
   * =========================
   * Discography
   * =========================
   */
  const recordListTemplate = path.resolve(
    './src/templates/RecordListTemplate.tsx',
  );

  const discographyTemplate = path.resolve(
    './src/templates/DiscographyTemplate.tsx',
  );

  const recordGroups = data.recordList.group;

  /**
   * artist -> [{ category, records }]
   */
  const artistMap = new Map<string, ArtistRecordGroup[]>();

  /**
   * 给 Map 添加数组元素
   */
  const addListValue = <K, V>(
    map: Map<K, V[]>,
    key: K,
    value: V,
  ) => {
    const values = map.get(key);

    if (values) {
      values.push(value);
    } else {
      map.set(key, [value]);
    }
  };

  recordGroups.forEach((recordGroup) => {
    const category = recordGroup.fieldValue;

    const frontmatters = recordGroup.nodes.map(
      (node) => node.frontmatter,
    );

    const grouped = _.groupBy(
      frontmatters,
      (record) => record.artist,
    );

    const recordsMap = Object.entries(grouped).map(
      ([artist, records]) => ({
        artist,
        records,
      }),
    );

    /**
     * 主分类
     */
    if (recordsMap.length === 1) {
      const { artist, records } = recordsMap[0];

      if (!artist) {
        return;
      }

      addListValue(
        artistMap,
        artist,
        {
          category,
          records,
        },
      );

      createPage({
        path: `/discography/${_.kebabCase(category)}/`,
        component: recordListTemplate,
        context: {
          title: category,
          categories: [category],
          artist,
          discographyIds: records
            .map((record) => record.id)
            .filter(Boolean),
        },
      });
    }

    /**
     * 子分类
     */
    else {
      createPage({
        path: `/discography/${_.kebabCase(category)}/`,
        component: discographyTemplate,
        context: {
          category,
        },
      });

      /**
       * 歌手
       */
      recordsMap.forEach(({ artist, records }) => {
        if (!artist) {
          return;
        }

        createPage({
          path: `/discography/${_.kebabCase(artist)}/`,
          component: recordListTemplate,
          context: {
            title: artist,
            categories: [category],
            artist,
            discographyIds: records
              .map((record) => record.id)
              .filter(Boolean),
          },
        });
      });
    }
  });

  /**
   * =========================
   * Artist Discography
   * =========================
   */
  for (const [artist, values] of artistMap.entries()) {
    /**
     * 只有一个分类时，
     * 前面已经创建过歌手页面
     */
    if (values.length === 1) {
      continue;
    }

    const categories = values.map(
      (value) => value.category,
    );

    const recordIds = values
      .flatMap((value) => value.records)
      .map((record) => record.id)
      .filter(Boolean);

    createPage({
      path: `/discography/${_.kebabCase(artist)}/`,
      component: recordListTemplate,
      context: {
        title: artist,
        categories,
        artist,
        discographyIds: recordIds,
      },
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields
    }

    type MarkdownRemarkFields {
      songYear: String
      songReleaseDate: String
    }
  `);
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNodesByType,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  const frontmatter = node.frontmatter as {
    type?: string;
    discographyId?: string[];
  };

  if (frontmatter.type !== 'song') {
    return;
  }

  const discographyIds = frontmatter.discographyId ?? [];

  if (discographyIds.length === 0) {
    return;
  }

  const records = getNodesByType('MarkdownRemark');

  const releaseDates = records
    .filter((record) => {
      const fm = record.frontmatter as {
        type?: string;
        id?: string;
        recordReleaseDate?: string;
      };

      return (
        fm.type === 'record' &&
        fm.id &&
        discographyIds.includes(fm.id) &&
        fm.recordReleaseDate
      );
    })
    .map((record) => {
      const fm = record.frontmatter as {
        recordReleaseDate?: string;
      };

      return fm.recordReleaseDate!;
    })
    .sort();

  if (releaseDates.length === 0) {
    return;
  }

  const songReleaseDate = releaseDates[0];
  const songYear = songReleaseDate.substring(0, 4);

  createNodeField({
    node,
    name: 'songYear',
    value: songYear,
  });

  createNodeField({
    node,
    name: 'songReleaseDate',
    value: songReleaseDate,
  });
};