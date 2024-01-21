import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import { SiteMetaQuery } from "../graphql"

type MetaProps = JSX.IntrinsicElements["meta"]

interface SEOProps {
  description?: string
  lang?: string
  meta?: MetaProps[]
  title: string
}

function SEO({ description, lang = `zh-CN`, meta = [], title }: SEOProps): any {
  const { site } = useStaticQuery(
    graphql`
      query SiteMeta {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const siteMetadata = site!.siteMetadata!
  const metaDescription = description || siteMetadata.description!

  const constantMeta: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author!,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  // htmlAttributes={{
  //   lang,
  // }}
  // title={title}
  // titleTemplate={`%s | ${siteMetadata.title} | ${siteMetadata.description}`}
  // meta={constantMeta.concat(meta)}

  return (
    <>
      <html lang={lang} />
      <title>{`${title} | ${siteMetadata.title} | ${siteMetadata.description}`}</title>
      {
        constantMeta.map((item, idx) => (<meta name={item.name} key={idx} content={item.content} />))
      }
    </>
  )
}

export default SEO