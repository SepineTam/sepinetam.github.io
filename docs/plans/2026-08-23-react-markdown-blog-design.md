# React Markdown 博客重建设计

## 产品边界

新版只承担博客功能，与 `www.sepinetam.com` 的个人主页分工。首版包含文章索引、标签浏览、文章详情和空内容状态；旧首页、Donate、Typewriter、旧归档及旧文案全部下线，不迁移旧内容。Git 历史中的 `a57109a` 仍是完整回滚点，因此重建不需要复制旧页面到新版目录。视觉方向是“研究者的编辑部手记”：纸张色背景、深墨色文字、朱红强调、明显的刊号与日期层级，以及克制的网格和动效。它应像持续出版的个人刊物，而不是产品后台或通用博客模板。

## 内容与页面

每篇文章是 `src/content/posts/*.md`。文件顶部使用 YAML frontmatter，字段包括 `title`、`date`、`summary`、`tags`、`lang` 和 `draft`。构建时 Vite 以原始文本导入 Markdown，应用解析 frontmatter、过滤草稿并按日期倒序排列。正文由 `react-markdown` 和 `remark-gfm` 渲染，支持标题、列表、表格、引用、链接和代码块。仓库提供一个不会发布的 `_template.md`，后续发文只需复制模板、填写内容并 push。

路由使用干净的 `/posts/:slug`。GitHub Pages 找不到深层路径时会返回构建产物中的 `404.html`，该文件与 SPA 入口一致，因此 React Router 能恢复文章页面。不存在的 slug 显示站内 404，不把读者留在空白页。首页在没有正式文章时展示自然的“新一辑正在准备”状态；模板不会出现在列表中。

## 发布与验证

`main` 只保存源代码。GitHub Actions 在每次 push 后执行 `npm ci`、测试、检查、构建，然后上传 `dist` 并通过 GitHub Pages 官方 Actions 发布。Pages 发布源切换为 GitHub Actions，Custom domain 设置为 `blog.sepinetam.com`；现有 DNS CNAME 保持不变。上线前验证单元测试、ESLint 和生产构建，上线后检查 GitHub Actions、Pages API、域名响应、首页与深层路由。按项目规则不启动本地前端服务。
