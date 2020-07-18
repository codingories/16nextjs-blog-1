import {NextPage} from 'next'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import { usePosts } from 'hooks/usePosts'
import { getPosts } from 'lib/posts'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      <div>没有文章</div>
      {posts.map( p =><div key={p.id}>
        <Link href={`/posts/${p.id}`}>
          <a href="">
            {p.id}
          </a>
        </Link>
      </div>)}
    </div>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
