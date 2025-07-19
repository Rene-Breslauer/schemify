/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Schemify`,
    description: `Schemify makes it easy to generate Schema.org JSON‑LD and matching Shopify Liquid snippets—just fill in your data and copy the ready‑to‑use code.`,
    author: `@schemifydev`,
    siteUrl: `https://schemify.dev`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Schemify`,
        short_name: `Schemify`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#AFFC41`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-postcss`,
  ],
}
