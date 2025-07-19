import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogItems from "../components/blogItems"

const Blog = () => (
  <Layout>
   <BlogItems />
  </Layout>
)

export const Head = () => <Seo title="Blog" />

export default Blog
