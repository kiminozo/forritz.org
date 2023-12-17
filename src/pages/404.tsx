import React from "react"

import { SEO, Layout } from "../components";

export const Head = () => <SEO title="404" />


const NotFoundPage = () => (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
