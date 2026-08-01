import { createHash, timingSafeEqual } from 'node:crypto';
import { cleanArticleContent, saveArticle, type NewsArticle } from '@/lib/news';

export const runtime = 'nodejs';
function result(code: 0 | 1, msg: string) { return Response.json({ code, msg }, { status: 200 }); }
function validSign(received: string, expected: string) {
  return timingSafeEqual(createHash('sha256').update(received).digest(), createHash('sha256').update(expected).digest());
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let values: Record<string, string>;
    if (contentType.includes('application/json')) {
      const body = await request.json() as Record<string, unknown>;
      values = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, String(value ?? '')]));
    } else {
      const form = await request.formData();
      values = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)]));
    }
    const expectedSign = process.env.ARTICLE_WEBHOOK_SIGN;
    if (!expectedSign) return result(0, '服务端秘钥尚未配置');
    if (!values.sign || !validSign(values.sign, expectedSign)) return result(0, '秘钥错误');
    const title = values.title?.trim();
    const content = values.content?.trim();
    if (!title && !content) return result(1, '发布成功');
    if (!title) return result(0, '文章标题不能为空');
    if (!content) return result(0, '文章内容不能为空');
    if (title.length > 200) return result(0, '文章标题不能超过200字');
    const imageUrl = values.image_url?.trim() ?? '';
    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) return result(0, '封面图地址必须以 http:// 或 https:// 开头');
    const publishedAt = new Date().toISOString();
    const slug = `${publishedAt.replace(/\D/g, '').slice(0, 14)}-${createHash('sha1').update(`${title}${publishedAt}`).digest('hex').slice(0, 8)}`;
    const article: NewsArticle = { id: slug, slug, classId: values.class_id?.trim() || 'news', title,
      content: cleanArticleContent(content), authorId: values.author_id?.trim() || '挽梦家纺', imageUrl, publishedAt };
    await saveArticle(article);
    return result(1, '发布成功');
  } catch (error) {
    return result(0, `发布失败：${error instanceof Error ? error.message : '未知错误'}`);
  }
}

export async function GET() { return result(0, '请使用 POST 请求发布文章'); }
