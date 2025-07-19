/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path     = require('path')
const { articles } = require('./src/data/articleData')


/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  articles.forEach((article) => {
    const slug = article.slug;

    createPage({
      path: `/article/${slug}`,
      component: path.resolve(`src/templates/articleTemplate.js`),
      context: { article },
    });
  });
}
