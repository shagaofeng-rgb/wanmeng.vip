import Link from 'next/link';
import { getArticles } from '@/lib/news';

export const dynamic = 'force-dynamic';
export const metadata = { title: '新闻动态', description: '挽梦家纺品牌动态、宿舍生活指南与校园资讯。' };

export default async function NewsPage() {
  const articles = await getArticles();
  return <>
    <section className="page-hero news-hero"><p className="eyebrow">NEWS & STORIES</p><h1>新闻动态</h1><p>关于宿舍生活、产品更新与挽梦的校园故事。</p></section>
    <section className="news-grid">
      {articles.length ? articles.map((article) => <article className="news-card" key={article.id}>
        {article.imageUrl ? <div className="news-cover" style={{backgroundImage:`url(${JSON.stringify(article.imageUrl).slice(1,-1)})`}} /> : <div className="news-cover news-cover-empty">挽梦家纺</div>}
        <div className="news-card-body"><p className="eyebrow">{new Date(article.publishedAt).toLocaleDateString('zh-CN')} · {article.authorId}</p><h2><Link href={`/news/${article.slug}`}>{article.title}</Link></h2><Link className="text-link" href={`/news/${article.slug}`}>阅读全文 →</Link></div>
      </article>) : <div className="news-empty"><h2>新闻正在准备中</h2><p>品牌动态和校园生活内容即将更新，欢迎稍后再来。</p></div>}
    </section>
  </>;
}
