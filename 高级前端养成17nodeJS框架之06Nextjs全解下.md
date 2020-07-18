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
  - 什么是动态内容静态化
    - 其实每个人看到的文章列表都是一样的
    - 为什么还需要在每个人的浏览器上渲染一次
    - 为什么不在后端渲染好，然后发给每个人
    - N 次渲染变成了一次渲染
    - N 次客户端渲染变成了一次静态页面生成
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
- 参考 React SSR 的官方文档
  - 推荐在后端 renderToString()在前端 hydrate()
  - hydrate()混合，会保留 HTML 并附上事件监听
  - 也就是说后端渲染 HTML,前端添加监听
  - 前端也会渲染一次，用以确保前后端渲染结果一致
- 推论
  - 所有页面至少有一个标签是静态内容，由服务器渲染

十. getStaticProps 获取 posts

- 声明位置
  - 每个 page 不是默认导出一个函数么？
  - 把 getStaticProps 声明在这个函数旁边即可
  - 必须加 export
- 写法
  ```
    export const getStaticProps = async () => {
      const posts = await getPosts()
      return {
        props: {
          posts: posts
        }
      }
    }
  ```

十一. getStaticProps

- 如何使用 props

```
  export default function PostsIndex = (props)
    => {...}
  默认导出的函数的第一个参数就是props
```

- 如何给 props 添加类型

```
  const PostsIndex: NextPage<{ posts: Post[] }>
    = (props) => {...}
```

    - 把 function 改成const + 箭头函数
    - 类型声明为NextPage
    - 用范型给NextPage传个参数```<XProps>```
    - Props 就是 props 的类型

十二. 同构

- ![同构.png](https://i.loli.net/2020/07/18/lCF7LJGZEMAmxXv.png)
- 有没有发现
  - 前端不用 AJAX 也能拿到 posts 了
  - 这就是同构 SSR 的好处: 后端数据可以直接传给前端
  - 前端 JSON.parse 一下就能得到了 posts（帮你做了）
- 难道 PHP/Java/Python 就不做不到么
  - 其实也可以做到，思路一样
  - 但是它们不支持 JSX，很难与 React 无缝对接
  - 而且它们的对象不能直接提供给 JS 用，需要类型转换

十三. 静态化的时机

- 环境
  - 在开发环境，每次请求都会运行一次 getStaticProps
  - 这是为了方便你修改代码重新运行
  - 在生产环境，getStaticProps 只在 build 时运行一次
  - 这样可以提供一份 HTML 给所有用户下载
- 如何体验生产环境
  - 关掉 yarn dev
  - yarn build
  - yarn start

十四. 生产环境

- 解读
  - λ（Server）SSR 不能自动创建 HTML
  - ○(Static)自动创建 HTML(发现没用到 props)
  - ●(SSG)自动创建 HTML JS JSON(发现用到了 props)
- 三种文件类型
  - posts.html 含有静态内容，用于用户直接访问
  - posts.js 也含有静态内容，用于快速导航（与 HTML 对应）
  - posts.json 含有数据，跟 posts.js 结合得到界面
- 为了让 posts.js 接收不同的数据所以不直接把数据放入 posts.js
- 目前只能接收来自 getStaticProps 的一个数据

十五. 小结

- **动态内容静态化**
  - 如果动态内容与用户无关，那么可以提前静态化
  - 通过 getStaticProps 可以获取数据
  - **静态内容** + **数据(本地获取)** 就可以得到了完整页面
  - 代替了之前的**静态内容+动态内容(AJAX 获取)**
- 时机
  - 静态化是在 yarn build 的时候实现的
- 优点
  - 生产环境中直接给出完整页面
  - 首屏不会白屏
  - 搜索引擎能看到页面内容，方便 SEO

十六. 如果页面跟用户相关呢？

- 比如根据用户的 user id 显示不同的信息流
- 用户相关动态内容
  - <label style="color:red">较难提前静态化</label>
    - 需要在<label style="color:red">用户请求时</label>，获取用户信息，然后<label style="color:red">通过用户信息去数据库</label>拿数据
    - <label style="color:gray">如果硬要做，就要给每个用户创建一个页面</label>
    - 有时候这些数据<label style="color:red">更新极快</label>，无法提前静态化
    - 比如微博首页的信息流
  - <label style="color:red">那怎么办？</label>
    - 要么客户端渲染，下拉更新
    - 要么服务端渲染，下拉更新
    - 但这次的服务端渲染不能用 getStaticProps
    - 因为 getStaticProps 是在 build 时执行的
    - 可用 getServerSideProps(context: NextPageContext)

十七. getServerSideProps

- 运行时机
  - 无论是开发还是生产环境
  - 都是在<label style="color:red">请求到来之后运行</label>getServerSideProps
- 回顾一下 getStaticProps
  - 开发环境，每次请求到来后运行，方便开发
  - 生产环境,<label style="color:red">build 时运行一次
- 参数
  - context,类型为 NextPageContext
  - context.req/context.res 可以获取请求和响应
  - 一般只需要用到 context.req

十八. 示例展示用户浏览器

```
const index:NextPage<Props> = (props) => {
  const {browser} = props;
  return (
    <div>
     <h1>你的浏览器是:{browser.name}</h1>
    </div>
  )
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context)=> {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser
    }
  }
};
```

十九. 总结

1. 静态内容
   - 直接输出 HTML,没有术语
2. 动态内容
   - 术语: 客户端渲染，通过 AJAX 请求，渲染成 HTML
3. 动态内容静态化
   - 术语: SSG, 通过 getStaticProps 获取用户无关内容
4. 用户相关动态内容静态化
   - 术语: SSR, 通过 getServerSideProps 获取请求
   - 缺点: 无法获取客户端信息，如浏览器窗口大小

二十. 流程图

- ![流程图.png](https://i.loli.net/2020/07/18/zRc7QeYbJ1hNGkf.png)
- 有动态内容吗？没有什么都不用做，自动渲染为 HTML
- 动态内容跟客户端相关吗？相关就只能用客户端渲染(BSR)
- 动态内容跟用户的请求/用户相关吗？相关就只能用服务端渲染(SSR)或 BSR
- 其他情况可以用 SSG 或 SSR 或 BSR

二十一. 还差一个功能

- 点击 posts 列表查看文章
  - 简单，不就是加个 Link>a 标签吗
  - href = `'/posts/${id}'`
- 新建的文件名应该叫做什么
  - `pages/posts/[id].tsx`
  - 文件名就是`[id].tsx`
- `/pages/posts/[id].tsx的作用`
  - 既声明了路由/posts/:id
  - 又是/posts/:id 的页面实现程序

二十二. 如何写`[id].tsx`

- 步骤
  - 实现 PostsShow, 从 props 接收 post 数据
  - 实现 getStaticProps, 从第一个参数接收 params.id
  - 实现 getStaticPaths,返回 id 列表
- 优化
  - 使用 marked 得到 markdown 的 HTML 内容
- build
  - 中断 yarn dev
  - yarn build 然后看一下.next/server 目录
  - yarn start

二十三. 填坑

- 接收不同的 json 数据
- fallback:false 的作用
  - 是否自动兜底
  - false 表示如果请求的 id 不在 getStaticPaths 的结果里，直接返回 404 页面
  - true 表示自动兜底，id 找不到依然渲染页面
  - 注意 id 不再结果里不代表 id 不存在，比如大型项目无法将所有产品页面都静态化，只静态化部分 id 对应的页面

二十四. 最后总结

- 制作 API
  - 放在/pages/api/目录里,一般加一个 v1
- 三种渲染方式
  - BSR/SSG/SSR
  - 流程图
- 三个 API
  - getStaticProps(SSG)
  - getStaticPaths(SSG)
  - getServerSideProps(SSR)
- 概念
  - 白屏
  - BSR 为什么不适合 SEO
  - 静态化是什么
  - 同构是什么
