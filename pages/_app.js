import Head from "next/dist/next-server/lib/head"
import React from "react"

export default function App({ Component, pageProps }) {
  return <div className="ories">
    <Head>
      <title>我的博客 - Ories</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </div>
}
