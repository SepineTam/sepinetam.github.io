import { describe, expect, it } from 'vitest'
import {
  createPostCollection,
  getPostBySlug,
  parsePostSource,
} from './posts.js'

const firstPost = `---
title: 第一篇
date: 2026-08-20
summary: 第一篇摘要
tags:
  - Research
  - Notes
lang: zh-CN
---

# 正文
`

const laterPost = `---
title: Later post
date: 2026-08-22
summary: A later note
tags: [Code]
lang: en
---

Later body.
`

const draftPost = `---
title: Draft
date: 2026-08-23
draft: true
---

Not ready.
`

describe('parsePostSource', () => {
  it('parses frontmatter, content, and the filename slug', () => {
    expect(parsePostSource(firstPost, '../content/posts/first-note.md')).toMatchObject({
      slug: 'first-note',
      title: '第一篇',
      date: '2026-08-20',
      summary: '第一篇摘要',
      tags: ['Research', 'Notes'],
      lang: 'zh-CN',
      draft: false,
      content: '# 正文',
    })
  })

  it('rejects a post without required metadata', () => {
    expect(() => parsePostSource('No frontmatter', 'broken.md')).toThrow(
      'broken.md must start with YAML frontmatter',
    )
  })
})

describe('createPostCollection', () => {
  it('filters drafts and sorts published posts newest first', () => {
    const posts = createPostCollection({
      '../content/posts/first-note.md': firstPost,
      '../content/posts/later-note.md': laterPost,
      '../content/posts/draft.md': draftPost,
    })

    expect(posts.map((post) => post.slug)).toEqual(['later-note', 'first-note'])
  })

  it('looks up a published post by slug', () => {
    const posts = createPostCollection({
      '../content/posts/first-note.md': firstPost,
    })

    expect(getPostBySlug('first-note', posts)?.title).toBe('第一篇')
    expect(getPostBySlug('missing', posts)).toBeUndefined()
  })
})
