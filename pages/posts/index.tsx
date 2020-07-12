import {NextPage} from 'next';
import axios from 'axios';
import {useEffect} from 'react';

const PostsIndex: NextPage = () => {
  useEffect(() => {
    axios.get('/api/v1/posts').then(x=>{
      console.log(x.data)
    })
  }, []); //写[]，表示第一次渲染请求，不写表示此次都请求

  return (
    <div>
      Posts Index
    </div>
  );
};

export default PostsIndex;
