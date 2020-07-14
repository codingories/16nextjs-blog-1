---
title: 高级前端养成17nodeJS框架之06Nextjs全解下
date: 2020-07-12 18:48:38
tags: 高级前端
---

一. 启用 TypeScript

1. 创建 tsconfig.json
   - tsc --init 运行后得到 tsconfig.json
   - 将 jsconfig.json 里面的配置合并到 tsconfig.json
   - 删除 jsconfig.json
2. 重启 yarn --dev
   - yarn add --dev typescript @types/react @types/node @types/react-dom
   - yarn dev
3. 改后缀
   - 将文件名由.js 改为.tsx
   - 不需要一次将所有文件全部改完
4. tsconfig 加强
   - 在 tsconfig 里添加"noImplicitAny": true
   - 禁用隐式的 any

二. Next.js Api

- 目前的页面
  - index 和 posts/first-post 都是 HTML
  - 但实际开发中我们需要请求/user /shops 等 API
  - 返回的内容是 JSON 格式的字符串
- 使用 Next.js API
  - 路径为/api/v1/posts 以便与/posts 区分开来
  - 默认导出的函数类型为 NextApiHandler
  - 该代码只运行在 Node.js 里，不运行在浏览器中

三. API 小结

- /api/里面的文件是 API
  - 一般返回 JSON 格式的字符串
  - 但也不是不能返回 HTML, 比如`res.end('<h1>...')`
- API 文件默认导出 NextApiHandler
  - 这是一个函数类型
  - 第一个参数是请求
  - 第二个参数是对象
  - Next.js 基于 Express,所以支持 Express 的中间件。详细见[文档](https://nextjs.org/docs/api-routes/api-middlewares)

四. Next.js 三种渲染

- 客户端渲染
  - 只在浏览器上执行的渲染
- 静态页面生成(SSG)
  - Static Site Generation,解决白屏问题，SEO 问题
  - 无法生成用户相关内容(所有用户请求的结果都一样)
- 服务端渲染(SSR)
  - 解决白屏问题，SEO 问题
  - 可以生成用户相关内容(不同用户结果不同)
- 注意: SSR 和 SSG 都属于预渲染 Pre-rendering

五. 旧瓶装新酒

- 三种渲染方式分别对应
  - 客户端渲染--用 JS，Vue，React 创建 HTML
  - SSG--页面静态话，把 PHP 提前渲染成 HTML
  - SSR--PHP,Python,Ruby,Java 后台的基本功能
- 不同点
  - Next.js 的预渲染可以与前端 React 无缝对接

六. 客户端渲染

- 用浏览器 JS 创建 HTML
  - 实现加载 posts
- 要点
  - 如何封装 usePosts
- 文件列表
  - pages/posts/index.tsx
  - lib/hooks/usePosts.tsx
- 总结

  - 文章列表是完全由前端渲染的，我们称之为客户端渲染

七. 客户端渲染的缺点

- 白屏
  - 在 AJAX 得到响应之前，页面中之后 Loading
- SEO 不友好
  - 搜索引擎访问页面，看不到 posts 数据
  - 因为搜索引擎默认不会执行 JS, 只能看到 HTML

八. 静态内容 v.s.动态内容

- ![静态动态.png](https://i.loli.net/2020/07/14/Y5zNXAMDJxo7VHT.png)
- 一般来说，静态内容是写在代码里的，动态内容是来自数据库的，我们将尝试用文件系统代替数据库

九. 思考
  - 上图中的静态内容
    - 是服务端渲染的，还是客户端渲染的
    - 渲染了几次，一次还是两次
  - 参考React SSR的官方文档
    - 推荐在后端renderToString()在前端hydrate()
    - hydrate()混合，会保留HTML并附上事件监听
    - 也就是说后端渲染HTML,前端添加监听
    - 前端也会渲染一次，用以确保前后端渲染结果一致
  - 推论
    - 所有页面至少有一个标签是静态内容，由服务器渲染