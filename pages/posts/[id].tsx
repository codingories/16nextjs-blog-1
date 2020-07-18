import {getPost, getPostIds} from '../../lib/posts';
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
  const idList = await getPostIds();
  console.log('idList',idList);
  console.log('idList.map(id => ({params: {id:id}}))',idList.map(id => ({params: {id:id}})));
  return {
    paths: idList.map(id => ({params: {id:id}})),
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
