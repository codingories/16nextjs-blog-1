import {getPost} from '../../lib/posts';
import * as React from 'react';

type Props = {
  post: Post
}

const postsShow: Next<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article>
        {post.content}
      </article>
    </div>
  )
}; // 3, 给一个posts返回一个文章

export default postsShow;

export const getStaticPaths = async ()=> {
  return {
    paths: [
      {
        params:{id: '第一篇博客'}
      },{
        params:{id: '第二篇博客'}
      },
    ],
    fallback: false
  };
}; // 1,获取所有id的穷举,穷举了才可能把页面提前生成

export const getStaticProps = async (x: any)=>{
  const id = x.params.id;
  const post = await getPost(id);
  return {
    props: {
      post: post
    }
  }
}; // 2, 给一个id返回一个post
