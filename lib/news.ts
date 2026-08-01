import { list, put } from '@vercel/blob';
import sanitizeHtml from 'sanitize-html';

export type NewsArticle = {
  id: string;
  slug: string;
  classId: string;
  title: string;
  content: string;
  authorId: string;
  imageUrl: string;
  publishedAt: string;
};

const PREFIX = 'wanmeng-news/';

function blobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('新闻存储尚未配置');
  return token;
}

export function cleanArticleContent(value: string) {
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
      img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }),
    },
  });
}

export async function saveArticle(article: NewsArticle) {
  await put(`${PREFIX}${article.slug}.json`, JSON.stringify(article), {
    access: 'public', addRandomSuffix: false, allowOverwrite: false,
    contentType: 'application/json; charset=utf-8', token: blobToken(),
  });
}

export async function getArticles(): Promise<NewsArticle[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const result = await list({ prefix: PREFIX, limit: 1000, token: blobToken() });
  const articles = await Promise.all(result.blobs.map(async (blob) => {
    const response = await fetch(blob.url, { cache: 'no-store' });
    return response.ok ? await response.json() as NewsArticle : null;
  }));
  return articles.filter((article): article is NewsArticle => Boolean(article))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string) {
  return (await getArticles()).find((article) => article.slug === slug) ?? null;
}
