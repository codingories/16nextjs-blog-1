import {NextPage} from 'next'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import { usePosts } from 'hooks/usePosts'
import { getPosts } from 'lib/posts'

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  console.log(props.posts);
  const {posts} = props
  return (
    <div>
      <div>没有文章</div>
      {posts.map( p =><div key={p.id}>
        {p.id}
      </div>)}
    </div>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
  const posts = await getPosts()
  console.log(posts)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
