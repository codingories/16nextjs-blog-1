import React, {useCallback} from "react"
import Link from "next/link"
import Head from "next/dist/next-server/lib/head"

console.log('执行了2')
export default function X(){
  const clickMe = useCallback(()=>{
    console.log('you click me')
  },[]) // useCallback 避免每次创建都执行
  return (
    <>
      {/*React.Fragment*/}
      <Head>
        <title>我的第一篇文章</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        First Post
        <button onClick={clickMe}>click me</button>
        <hr/>
        回到首页 <Link href="/"><a>点击这里</a></Link>
      </div>
    </>
  )
}
