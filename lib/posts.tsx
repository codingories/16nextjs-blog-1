import path from 'path';
import fs, {promises as fsPromise} from 'fs';
import matter from 'gray-matter';


export const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), 'markdown'); // 获取markdown文件所在的路径
  const fileNames = await fsPromise.readdir(markdownDir); // 获得markdown文件下的文件名
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g, '');
    console.log('fullPath');
    console.log(fullPath);
    const text = fs.readFileSync(fullPath, 'utf-8');
    // const {data, content} = matter(text);
    // const {title, date} = data;
    const {data: {title, date}, content} = matter(text);
    return {
      id, title, date
    };
  });
  return posts;
};
