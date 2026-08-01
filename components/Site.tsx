'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';

const nav = [
  ['产品中心', '/products'], ['选购指南', '/guide'], ['安全与面料', '/materials'],
  ['校园团购', '/campus'], ['新闻动态', '/news'], ['关于挽梦', '/about'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="note">给住校生活多一点安静，也给好梦多一点保护</div>
    <header>
      <Link className="brand" href="/"><b>挽梦家纺</b><span>WANMENG HOME</span></Link>
      <nav>{nav.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</nav>
      <div className="head-actions"><Link href="/search" aria-label="搜索">⌕</Link><Link className="btn small" href="/inquiry">获取尺寸建议</Link><button className="menu" onClick={() => setOpen((value) => !value)} aria-label="菜单">{open ? '×' : '☰'}</button></div>
    </header>
    {open ? <div className="mobile-nav">{nav.map(([name, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{name}<span>→</span></Link>)}<Link href="/contact">联系我们 <span>→</span></Link></div> : null}
  </>;
}

export function Footer() {
  return <>
    <section className="footer-cta"><p className="eyebrow">WANMENG HOME</p><h2>愿每一个在外求学的夜晚，<br/>都有一方安心的小天地。</h2><div><Link className="btn" href="/inquiry">获取尺寸建议</Link><Link className="text-link" href="/campus">申请校园团购 →</Link></div></section>
    <footer><div className="foot-brand"><b>挽梦家纺</b><span>WANMENG HOME</span><p>为住校生活而设计，<br/>为每一个好梦留一份安静。</p></div><div><b>产品中心</b><Link href="/products">宿舍床帘</Link><Link href="/products">蚊帐一体</Link><Link href="/materials">面料与细节</Link></div><div><b>帮助中心</b><Link href="/guide/measure">尺寸测量</Link><Link href="/guide/install">安装教程</Link><Link href="/guide/faq">常见问题</Link></div><div><b>和我们聊聊</b><Link href="/news">新闻动态</Link><Link href="/campus">校园合作</Link><Link href="/contact">联系我们</Link><span>{siteConfig.phone}</span></div></footer>
    <div className="copyright">© 2026 绍兴挽梦家纺有限公司 · <Link href="/privacy">隐私政策</Link></div>
  </>;
}

export function FloatingActions() { return <div className="floating"><Link href="/contact">咨询</Link><Link href="/inquiry">尺寸</Link></div>; }
export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) { return <div className={`image ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 60vw" priority /></div>; }
export function ProductCard({ p }: { p: any }) { return <article className="product-card"><Link href={`/products/${p.slug}`}><HeroImage src={p.images[0]} alt={p.name}/></Link><p className="eyebrow">{p.category}</p><h3>{p.name}</h3><p>{p.scene}</p><div className="tags">{p.tags.map((tag: string) => <span key={tag}>{tag}</span>)}</div><Link className="text-link" href={`/products/${p.slug}`}>查看详情 →</Link></article>; }
