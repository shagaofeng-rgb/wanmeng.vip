import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticle } from '@/lib/news';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.title } : { title: '文章未找到' };
}
export default async function NewsDetailPage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  return <article className="news-detail"><header><p className="eyebrow">NEWS · {new Date(article.publishedAt).toLocaleDateString('zh-CN')}</p><h1>{article.title}</h1><p>作者：{article.authorId}</p></header>{article.imageUrl ? <div className="news-detail-cover" style={{backgroundImage:`url(${JSON.stringify(article.imageUrl).slice(1,-1)})`}} /> : null}<div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} /></article>;
}
