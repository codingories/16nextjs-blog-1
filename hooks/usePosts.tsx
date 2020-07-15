import {useEffect, useState} from 'react';
import axios from 'axios';


export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/posts').then(response => {
      setTimeout(() => {
        setPosts(response.data);
        setIsLoading(false);
        if (response.data.length === 0) {
          setIsEmpty(true);
        }
      });
    }), () => {
      setIsLoading(false);
    };
  }, []); //写[]，表示第一次渲染请求，不写表示此次都请求
  return {posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty}
};
