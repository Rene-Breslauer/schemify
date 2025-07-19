import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

function Seo({
  title,
  description,
  children,
  pathname,       // e.g. useLocation().pathname
  isBlogPost = false,
  datePublished,
  dateModified,
  authorName,
  articleBody,
  featuredImage,  // full URL to image
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
            logo
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata.siteUrl.replace(/\/$/, "")
  const url = `${siteUrl}${pathname || ""}`

  // Base website schema
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: siteUrl,
      name: defaultTitle,
      description: site.siteMetadata.description,
      publisher: {
        "@type": "Organization",
        name: site.siteMetadata.author,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}${site.siteMetadata.logo}`,
        },
      },
    },
    ...(isBlogPost
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
            headline: title,
            description: metaDescription,
            image: {
              "@type": "ImageObject",
              url: featuredImage,
            },
            author: {
              "@type": "Person",
              name: authorName || site.siteMetadata.author,
            },
            publisher: {
              "@type": "Organization",
              name: site.siteMetadata.author,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}${site.siteMetadata.logo}`,
              },
            },
            datePublished,
            dateModified,
            articleBody,
          },
        ]
      : []),
  ]

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={isBlogPost ? "article" : "website"} />
      {children}

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      {/* ─────────── JSON-LD Rich Results ─────────── */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg, null, 2)}
      </script>
    </>
  )
}

export default Seo
