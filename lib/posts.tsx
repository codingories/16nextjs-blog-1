import path from 'path';
import fs, {promises as fsPromise} from 'fs';
import matter from 'gray-matter';
import marked from 'marked'

const markdownDir = path.join(process.cwd(), 'markdown'); // 获取markdown文件所在的路径

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir); // 获得markdown文件下的文件名
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g, '');
    const text = fs.readFileSync(fullPath, 'utf-8');
    const {data: {title, date}, content} = matter(text);
    return {
      id, title, date
    };
  });
  return posts;
};

export const getPost = async (id: string)=> {
  const fullPath = path.join(markdownDir, id+'.md');
  const text = fs.readFileSync(fullPath, 'utf-8');
  const {data: {title, date}, content} = matter(text);
  const htmlContent = marked(content);
  return JSON.parse(JSON.stringify({
    id, title, date, content, htmlContent
  }));
};

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir); // 获得markdown文件下的文件名
  return fileNames.map(fileName => fileName.replace(/\.md$/g, ''))
};
