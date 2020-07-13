import {NextPage} from 'next'
import axios from 'axios'
import {useEffect, useState} from 'react'

type Post = {
  id: string;
  date: string;
  title: string;
}

const PostsIndex: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/v1/posts').then(response => {
      setTimeout(()=>{
        setPosts(response.data)
        setIsLoading(false)
        if(response.data.length === 0){
          setIsEmpty(true)
        }
      })
    }), () => {
      setIsLoading(false)
    }
  }, []) //写[]，表示第一次渲染请求，不写表示此次都请求

  return (
    <div>
      <h1>文章列表</h1>
      {isLoading ? <div>加载中</div> :
        isEmpty ? <div>没有文章</div> :
        posts.map(p => <div key={p.id}>{
          p.id
        }</div>)}
    </div>
  )
}

export default PostsIndex
