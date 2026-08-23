import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import {
  formatPostDate,
  getPostBySlug,
  posts,
} from './lib/posts.js'

function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="Sepine's Blog 首页">
      <span className="wordmark__name">SEPINE</span>
      <span className="wordmark__mark" aria-hidden="true">/</span>
      <span className="wordmark__section">BLOG</span>
    </Link>
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <Wordmark />
      <nav className="site-nav" aria-label="主导航">
        <Link to="/">文章</Link>
        <a href="https://www.sepinetam.com">关于我 <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}

function EmptyJournal() {
  return (
    <div className="empty-state">
      <p className="empty-state__number" aria-hidden="true">00</p>
      <div>
        <h3>新的一辑正在准备。</h3>
        <p>旧内容已经归档。下一篇文章，将从一份新的 Markdown 文件开始。</p>
      </div>
    </div>
  )
}

function PostIndex() {
  if (posts.length === 0) {
    return <EmptyJournal />
  }

  return (
    <ol className="post-list">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <article className="post-preview">
            <p className="post-preview__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="post-preview__meta">
              <time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time>
              {post.tags.length > 0 && <span>{post.tags.join(' · ')}</span>}
            </div>
            <div className="post-preview__body">
              <h3>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.summary && <p>{post.summary}</p>}
            </div>
            <Link className="post-preview__arrow" to={`/posts/${post.slug}`} aria-label={`阅读《${post.title}》`}>
              ↗
            </Link>
          </article>
        </li>
      ))}
    </ol>
  )
}

function HomePage() {
  useEffect(() => {
    document.title = "Sepine's Blog"
  }, [])

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__index" aria-hidden="true">
          <span>VOL. 01</span>
          <span>SHANGHAI · 2026</span>
        </div>
        <div className="hero__body">
          <p className="eyebrow">A RESEARCHER'S FIELD NOTES</p>
          <h1 id="hero-title">
            研究、代码，
            <em>以及它们之间。</em>
          </h1>
          <p className="hero__intro">
            写下尚未成为论文的念头、正在生长的工具，
            以及研究工作里那些值得被看见的过程。
          </p>
        </div>
        <div className="hero__seal" aria-hidden="true">
          <span>ST</span>
          <small>FIELD<br />NOTES</small>
        </div>
      </section>

      <section className="journal" aria-labelledby="journal-title">
        <header className="section-heading">
          <p>01 / LATEST NOTES</p>
          <h2 id="journal-title">最近写下</h2>
          <span>按时间倒序</span>
        </header>
        <PostIndex />
      </section>
    </main>
  )
}

function NotFoundPage() {
  useEffect(() => {
    document.title = "页面未找到 — Sepine's Blog"
  }, [])

  return (
    <main className="not-found">
      <p className="eyebrow">404 / MISSING PAGE</p>
      <h1>这一页还没有写下。</h1>
      <Link className="text-link" to="/">回到博客首页 <span aria-hidden="true">→</span></Link>
    </main>
  )
}

function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Sepine's Blog`
    }
  }, [post])

  if (!post) {
    return <NotFoundPage />
  }

  return (
    <main className="article-page">
      <Link className="article-page__back" to="/">← 返回全部文章</Link>
      <header className="article-header">
        <div className="article-header__meta">
          <p className="eyebrow">FIELD NOTE / {post.lang.toUpperCase()}</p>
          <time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time>
        </div>
        <h1>{post.title}</h1>
        {post.summary && <p className="article-header__summary">{post.summary}</p>}
        {post.tags.length > 0 && (
          <ul className="tag-list" aria-label="文章标签">
            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
      </header>
      <article className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ children, ...properties }) => (
              <a {...properties} rel="noreferrer" target="_blank">{children}</a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      <footer className="article-end">
        <span aria-hidden="true">∎</span>
        <p>END OF NOTE</p>
      </footer>
    </main>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 SEPINE TAM</p>
      <p>BUILT WITH REACT · WRITTEN IN MARKDOWN</p>
      <a href="https://github.com/SepineTam" aria-label="Sepine Tam 的 GitHub">GITHUB ↗</a>
    </footer>
  )
}

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳到正文</a>
      <SiteHeader />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  )
}
