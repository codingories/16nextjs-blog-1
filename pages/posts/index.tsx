import {NextPage} from 'next'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import { usePosts } from 'hooks/usePosts'



const PostsIndex: NextPage = () => {
  const {isLoading, isEmpty, posts} = usePosts()
  const x = useCallback(()=>{
    console.log('x')
  }, [])
  return (
    <div>
      <h1 onClick={x}>文章列表</h1>
      {isLoading ? <div>加载中</div> :
        isEmpty ? <div>没有文章</div> :
        posts.map(p => <div key={p.id}>{
          p.id
        }</div>)}
    </div>
  )
}

export default PostsIndex
