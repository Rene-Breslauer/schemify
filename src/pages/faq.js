import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import FaqItems from "../components/faqItems"

const FAQ = () => (
  <Layout>
   <FaqItems />
  </Layout>
)

export const Head = () => <Seo title="Frequently Asked Questions" />

export default FAQ
