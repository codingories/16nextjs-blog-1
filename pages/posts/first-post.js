import React, {useCallback} from "react"
import Link from "next/link"

console.log('执行了2')
export default function X(){
  const clickMe = useCallback(()=>{
    console.log('you click me')
  },[]) // useCallback 避免每次创建都执行
  return (
      <div>
        First Post
        <button onClick={clickMe}>click me</button>
        <hr/>
        回到首页 <Link href="/"><a>点击这里</a></Link>
      </div>
  )
}
