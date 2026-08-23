import { Link, Route, Routes } from 'react-router-dom'

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

function HomePage() {
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
        <div className="empty-state">
          <p className="empty-state__number" aria-hidden="true">00</p>
          <div>
            <h3>新的一辑正在准备。</h3>
            <p>旧内容已经归档。下一篇文章，将从一份新的 Markdown 文件开始。</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / MISSING PAGE</p>
      <h1>这一页还没有写下。</h1>
      <Link className="text-link" to="/">回到博客首页 <span aria-hidden="true">→</span></Link>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  )
}
