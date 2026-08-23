# Sepine's Blog

`blog.sepinetam.com` 的 React 博客。网站由 GitHub Pages 托管，所有正式文章都来自 Markdown 文件。

## 发布文章

1. 复制 `src/content/posts/_template.md`。
2. 把副本改名为小写英文短横线格式，例如 `stata-mcp-notes.md`。
3. 修改文件顶部的信息，并把 `draft` 改成 `false`。
4. 在分隔线下方用 Markdown 写正文。
5. 提交并 push 到 `main`；GitHub Actions 会自动测试、构建和发布。

```yaml
---
title: 文章标题
date: 2026-08-23
summary: 用一两句话说明文章内容。
tags:
  - Research
lang: zh-CN
draft: false
---
```

必填字段是 `title` 和 `date`。日期必须使用 `YYYY-MM-DD`。`slug` 默认来自文件名，也可以在 frontmatter 中单独设置，但必须是小写英文短横线格式。

## 检查

本项目需要 Node.js 20.19 或更高版本。

```bash
npm ci
npm test -- --run
npm run lint
npm run build
```

按项目约定，不在本机启动前端开发服务；线上页面由 push 后的 GitHub Pages 部署验证。
