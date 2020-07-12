import path from 'path';
import {fs, promises as fsPromise} from 'fs';

export const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), 'markdown'); // 获取markdown文件所在的路径
  const fileNames = await fsPromise.readdir(markdownDir); // 获得markdown文件下的文件名
  fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    console.log('fullPath');
    console.log(fullPath);
    const text = fs.readFileSync(fileName, 'utf-8');
    console.log(text)
  });
  return fileNames;
};
