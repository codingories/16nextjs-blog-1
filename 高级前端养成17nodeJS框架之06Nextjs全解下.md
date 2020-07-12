---
title: 高级前端养成17nodeJS框架之06Nextjs全解下
date: 2020-07-12 18:48:38
tags: 高级前端
---
一. 启用TypeScript
  1. 创建tsconfig.json
       - tsc --init 运行后得到tsconfig.json
       - 将jsconfig.json里面的配置合并到tsconfig.json
       - 删除jsconfig.json
  2. 重启yarn --dev 
       - yarn add --dev typescript @types/react @types/node @types/react-dom
       - yarn dev
  3. 改后缀
       - 将文件名由.js改为.tsx
       - 不需要一次将所有文件全部改完
  4. tsconfig加强
       - 在tsconfig里添加"noImplicitAny": true
       - 禁用隐式的any

二. Next.js Api
  - 目前的页面
    - index和posts/first-post都是HTML
    - 但实际开发中我们需要请求/user /shops等API
    - 返回的内容是JSON格式的字符串
  - 使用Next.js API
    - 路径为/api/v1/posts以便与/posts区分开来
    - 默认导出的函数类型为NextApiHandler
    - 该代码只运行在Node.js里，不运行在浏览器中

三. API小结
  - /api/里面的文件是API
    - 一般返回JSON格式的字符串
    - 但也不是不能返回HTML, 比如```res.end('<h1>...')```
  - API文件默认导出NextApiHandler
    - 这是一个函数类型
    - 第一个参数是请求
    - 第二个参数是对象
    - Next.js基于Express,所以支持Express的中间件。详细见[文档](https://nextjs.org/docs/api-routes/api-middlewares)

四. Next.js 三种渲染
  - 客户端渲染
    - 只在浏览器上执行的渲染
  - 静态页面生成(SSG)
    - Static Site Generation,解决白屏问题，SEO问题
    - 无法生成用户相关内容(所有用户请求的结果都一样)
  - 服务端渲染(SSR)
    - 解决白屏问题，SEO问题
    - 可以生成用户相关内容(不同用户结果不同)
  - 注意: SSR和SSG都属于预渲染Pre-rendering

五. 旧瓶装新酒
  - 三种渲染方式分别对应
    - 客户端渲染--用JS，Vue，React创建HTML
    - SSG--页面静态话，把PHP提前渲染成HTML
    - SSR--PHP,Python,Ruby,Java后台的基本功能
  - 不同点
    - Next.js的预渲染可以与前端React无缝对接

六. 客户端渲染
  - 用浏览器JS创建HTML
    - 实现加载posts
  - 要点
    - 如何封装usePosts
  - 文件列表
    - pages/posts/index.tsx
    - lib/hooks/usePosts.tsx
  - 总结
    - 文章列表是完全由前端渲染的，我们称之为客户端渲染