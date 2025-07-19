/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/global.css"


import Header from "./header"
import Main from "./main"
import Footer from "./footer"
import "./layout.css"


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the SEO Rich Text Generator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The SEO Rich Text Generator is a free web tool that helps you create SEO-friendly structured data markup (JSON-LD) and Shopify snippets for Store, Product, Collection, Blog, and Article pages. Generate schema.org compliant JSON-LD in seconds, paste it into your <head> section, and enhance your site’s search visibility with rich snippets."
      }
    },
    {
      "@type": "Question",
      "name": "Which schema types are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support five schema.org types: Store, Product, Collection, Blog, and Article. Each schema includes essential properties—name, description, URL, images, offers, aggregateRating, reviews, and more—to ensure comprehensive structured data and maximum visibility in Google Rich Results."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install the generated schema on my site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After generating your JSON-LD snippet, copy the code and paste it between the <head> tags of your HTML template or Shopify theme.liquid file. Save, deploy your site, and verify your structured data with Google’s Rich Results Test or the Schema.org Structured Data Testing Tool."
      }
    },
    {
      "@type": "Question",
      "name": "Can I preview how the schema appears in search results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Run your page URL through Google’s Rich Results Test or the Schema.org Validator to preview rich snippets—such as FAQs, product stars, or article previews—and confirm that search engines correctly recognize your structured data."
      }
    },
    {
      "@type": "Question",
      "name": "Is the tool free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the SEO Rich Text Generator is 100% free with unlimited schema generations. No signup, subscription, or hidden fees—just instant, SEO-friendly JSON-LD at your fingertips."
      }
    }
  ]
}

  return (
    <>
     {/* Inject FAQ JSON-LD */}
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>
        {children}
        </main>
      <Footer />
    </>
  )
}

export default Layout
