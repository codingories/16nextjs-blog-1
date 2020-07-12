import {NextApiRequest, NextApiResponse} from 'next';

const Posts = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({name: 'frank'}));
  res.end()
};

export default Posts;
