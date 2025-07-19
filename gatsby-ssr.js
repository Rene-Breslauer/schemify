/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    <link
      key="favicon"
      rel="icon"
      href="/src/images/favicon.ico"         // ← root‑relative path
      type="image/x-icon"         // ← correct MIME for .ico
      sizes="64x64"
    />,
    <link
      key="shortcut-icon"
      rel="shortcut icon"
      href="/src/images/favicon.ico"
      type="image/x-icon"
    />,
  ])
}
