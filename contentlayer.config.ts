import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import highlight from 'rehype-highlight'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    authorTwitter: { type: 'string', required: true },
    category: { type: 'string' },
    tags: { type: 'json', required: false, default: [] },
    description: { type: 'string' },
    updated: { type: 'date' },
  },
  computedFields: {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
  markdown: { rehypePlugins: [highlight] },
})
