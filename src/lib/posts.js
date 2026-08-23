import { parse as parseYaml } from 'yaml'

const postModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function getFilenameSlug(filePath) {
  const filename = filePath.split('/').pop() ?? ''
  return filename.replace(/\.md$/, '')
}

function normalizeDate(value, filePath) {
  const date = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value ?? '')

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${filePath} must include a valid date in YYYY-MM-DD format`)
  }

  return date
}

export function parsePostSource(source, filePath) {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)

  if (!frontmatterMatch) {
    throw new Error(`${filePath} must start with YAML frontmatter`)
  }

  const metadata = parseYaml(frontmatterMatch[1]) ?? {}
  const title = String(metadata.title ?? '').trim()

  if (!title) {
    throw new Error(`${filePath} must include a title`)
  }

  const filenameSlug = getFilenameSlug(filePath)
  const slug = String(metadata.slug ?? filenameSlug).trim()

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${filePath} must use a lowercase kebab-case slug`)
  }

  const tags = Array.isArray(metadata.tags)
    ? metadata.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : []

  return {
    slug,
    title,
    date: normalizeDate(metadata.date, filePath),
    summary: String(metadata.summary ?? '').trim(),
    tags,
    lang: String(metadata.lang ?? 'zh-CN'),
    draft: metadata.draft === true,
    content: source.slice(frontmatterMatch[0].length).trim(),
  }
}

export function createPostCollection(modules) {
  return Object.entries(modules)
    .map(([filePath, source]) => parsePostSource(source, filePath))
    .filter((post) => !post.draft)
    .sort((firstPost, secondPost) => secondPost.date.localeCompare(firstPost.date))
}

export function getPostBySlug(slug, collection = posts) {
  return collection.find((post) => post.slug === slug)
}

export function formatPostDate(date, lang = 'zh-CN') {
  return new Intl.DateTimeFormat(lang, {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`))
}

export const posts = createPostCollection(postModules)
