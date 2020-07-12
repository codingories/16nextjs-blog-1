import {NextPage} from 'next';
import axios from 'axios';
import {useEffect, useState} from 'react';

type Post = {
  id: string;
  date: string;
  title: string;
}

const PostsIndex: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get('/api/v1/posts').then(response => {
      console.log(response.data)
      setPosts(response.data);
    });
  }, []); //写[]，表示第一次渲染请求，不写表示此次都请求

  return (
    <div>
      {
        posts.map(p=><div key={p.id}>{
          p.id
        }</div>)
      }
    </div>
  );
};

export default PostsIndex;
